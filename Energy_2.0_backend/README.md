# Energy 2.0 Backend Report

## 1. Executive Summary

Energy 2.0 Backend is a Django + PostgreSQL service responsible for ingesting meter telemetry and prediction data from another backend and persisting it for dashboard and admin consumption.

At present, the ingestion layer is implemented as a POST endpoint (`/meter_update`) in the `web_backend` app. The service is configured to use an append-only write strategy for incoming updates: each new payload creates a fresh record in the `Generator` table, even if `meter_id` is repeated.

This document is written in report format and covers architecture, workflow, data contract, setup, operations, verification, and recommendations.

## 2. Project Scope and Objectives

### 2.1 Scope

The currently implemented scope includes:

1. Accepting update payloads over HTTP.
2. Parsing and normalizing payload formats from upstream backend.
3. Persisting normalized values to PostgreSQL.
4. Exposing admin and basic route surface for operations.

### 2.2 Primary Objective

Create a backend ingestion service that reliably stores meter update snapshots with minimal coupling to upstream payload shape.

### 2.3 Secondary Objectives

1. Accept multiple input key aliases (for backward compatibility).
2. Handle nested prediction list formats.
3. Return useful ingestion summaries (`received`, `created`, `errors`).

## 3. Technology Stack

1. Language: Python
2. Web Framework: Django 5.2.x
3. Database: PostgreSQL
4. ORM: Django ORM
5. Data Types: PostgreSQL `ArrayField` through `django.contrib.postgres`

## 4. Repository and Module Layout

```
Energy_2.0_backend/
  .venv/
  energy_backend/
   manage.py
   energy_backend/
    settings.py
    urls.py
    wsgi.py
    asgi.py
   web_backend/
    models.py
    views.py
    urls.py
    admin.py
    migrations/
```

### 4.1 Responsibility by Module

1. `manage.py`
  - Django command entry point.
2. `energy_backend/settings.py`
  - App registrations, middleware, DB connection, project configuration.
3. `energy_backend/urls.py`
  - Root URL router and app inclusion.
4. `web_backend/urls.py`
  - App-level endpoint mappings.
5. `web_backend/views.py`
  - Endpoint handlers and ingestion logic.
6. `web_backend/models.py`
  - Schema definitions for domain entities.

## 5. Runtime Architecture

### 5.1 High-Level Flow

1. Upstream backend generates meter state and predictions.
2. Upstream sends HTTP POST to `http://localhost:8000/meter_update`.
3. Django endpoint validates and parses JSON payload.
4. Payload is normalized to internal fields.
5. ORM inserts a new row into `Generator`.
6. API responds with ingestion statistics.

### 5.2 Logical Components

1. Inbound API layer (Django view)
2. Payload normalization layer (helper functions)
3. Persistence layer (Django ORM + PostgreSQL)
4. Observability via response summary and shell/admin inspection

## 6. URL and Endpoint Report

Current route surface:

1. `/`
  - Home response text.
2. `/homepage/`
  - Alias to home response.
3. `/meter_update`
  - Primary POST ingestion endpoint.
4. `/meter_update/`
  - Slash-terminated alias of ingestion endpoint.
5. `/api/fetch/`
  - Bound to same ingestion view (legacy alias).
6. `/admin/`
  - Django admin interface.

## 7. Data Model Report

### 7.1 Active Ingestion Table: `Generator`

`Generator` currently stores ingested snapshots.

Fields:

1. `id` (`AutoField`, primary key)
2. `meter_id` (`CharField`)
3. `consumption_kw` (`FloatField`)
4. `predicted_kwh` (`FloatField`)
5. `predicted_kwh_24h` (`ArrayField(FloatField)`, size 24)
6. `predicted_kwh_week` (`ArrayField(FloatField)`, size 168)
7. `timestamp` (`DateTimeField(auto_now_add=True)`)

### 7.2 Notes on Other Models

`models.py` contains several additional domain models (`Substation`, `Transformer`, `Meter`, `EnergyReading`, `TransformerReading`, `GeneratorModel`, `MeterID`) that are currently either marked as not used or not part of the ingestion pathway.

## 8. Ingestion Logic and Field Mapping

### 8.1 Endpoint Behavior

`fetcher` in `web_backend/views.py`:

1. Accepts only POST requests.
2. Is CSRF exempt for backend-to-backend communication.
3. Parses `request.body` as JSON.
4. Supports three top-level payload shapes:
  - Single object
  - List of objects
  - Object with `data` list
5. Iterates over records and attempts to store each one.

### 8.2 Input Key Normalization

For each record:

1. Meter ID:
  - Required key: `meter_id`
2. Consumption:
  - `consumption_kw` fallback `last_true_kwh` fallback `current_consumption_kw` fallback `0.0`
3. Single prediction:
  - `predicted_kwh` fallback `last_predicted_kwh` fallback `0.0`
4. 24-hour series:
  - `predicted_kwh_24h` fallback `predictions_24h`
5. 1-week series:
  - `predicted_kwh_week` fallback `predictions_week`

### 8.3 Prediction List Normalization

Helper `_to_float_list(values, limit)` handles:

1. Plain numeric arrays: `[1.1, 1.2, ...]`
2. Object arrays: `[{"timestamp": ..., "predicted_kwh": 1.1}, ...]`
3. Safe conversion: non-convertible entries are skipped.
4. Length enforcement: 24 items for day, 168 items for week.

### 8.4 Persistence Strategy (Current)

Current persistence call uses `Generator.objects.create(...)`, therefore:

1. Each valid record creates a new DB row.
2. Existing `meter_id` does not cause update.
3. This enables historical append behavior for repeated updates.

## 9. API Contract Report

### 9.1 Request Example

```json
{
  "meter_id": "MTR-1001",
  "last_true_kwh": 2.14,
  "last_predicted_kwh": 2.05,
  "predictions_24h": [
   {"timestamp": "2026-03-30 11:00:00", "predicted_kwh": 1.90},
   {"timestamp": "2026-03-30 12:00:00", "predicted_kwh": 2.10}
  ],
  "predictions_week": [
   {"timestamp": "2026-03-31 11:00:00", "predicted_kwh": 2.00}
  ]
}
```

### 9.2 Response Example

```json
{
  "status": "ok",
  "received": 1,
  "created": 1,
  "updated": 0,
  "errors": []
}
```

`updated` remains `0` under append-only mode.

### 9.3 Error Modes

1. Invalid JSON -> HTTP 400 with `Invalid JSON payload.`
2. Unsupported structure -> HTTP 400
3. Per-row validation/conversion errors -> captured into `errors` list; response may be HTTP 207 if partial success.

## 10. Environment and Configuration

### 10.1 Django Settings Snapshot

Current significant settings:

1. `DEBUG = True`
2. Database engine: `django.db.backends.postgresql`
3. DB name: `energy_project`
4. Installed app dependency: `django.contrib.postgres`

### 10.2 Configuration Risks (Current State)

1. Secret key is in source.
2. Database credentials are hardcoded in settings.
3. `ALLOWED_HOSTS` is empty (development-only posture).

## 11. Setup and Execution Procedure

### 11.1 Prerequisites

1. Python 3.11+
2. PostgreSQL server running
3. Database `energy_project` created

### 11.2 Installation

From repository root:

```bash
pip install django psycopg2-binary
```

Optional package already considered in project context:

```bash
pip install django-cors-headers
```

### 11.3 Migration and Admin

```bash
cd energy_backend
python manage.py migrate
python manage.py createsuperuser
```

### 11.4 Run Server

```bash
python manage.py runserver
```

Default local URL: `http://127.0.0.1:8000/`

## 12. Operational Verification Plan

### 12.1 Endpoint Reachability Check

1. Start Django server.
2. Send one POST to `/meter_update`.
3. Expect HTTP 200 or 207.

### 12.2 Sample Ingestion Test (curl)

```bash
curl -X POST http://127.0.0.1:8000/meter_update \
  -H "Content-Type: application/json" \
  -d '{
   "meter_id": "MTR-TEST-1",
   "last_true_kwh": 1.23,
   "last_predicted_kwh": 1.11,
   "predictions_24h": [
    {"timestamp": "2026-03-30 10:00:00", "predicted_kwh": 1.2}
   ],
   "predictions_week": [
    {"timestamp": "2026-03-31 10:00:00", "predicted_kwh": 1.3}
   ]
  }'
```

### 12.3 Database Verification

```bash
python manage.py shell
```

```python
from web_backend.models import Generator

latest = Generator.objects.filter(meter_id="MTR-TEST-1").order_by("-id").values().first()
count = Generator.objects.filter(meter_id="MTR-TEST-1").count()
print(latest)
print(count)
```

Expected outcome:

1. `latest` should contain most recent payload values.
2. `count` should increase with each POST for same `meter_id`.

## 13. Known Limitations

1. Endpoint authentication is not implemented.
2. No request signing or anti-replay mechanism.
3. No formal API versioning.
4. Limited structured logging and metrics.
5. Multiple unused schema models increase maintenance overhead.
6. Legacy endpoint alias naming (`/api/fetch/`) may be misleading now that ingestion is push-based.

## 14. Security and Production Readiness Recommendations

1. Move `SECRET_KEY` and DB credentials to environment variables.
2. Add API-key or JWT auth for `/meter_update`.
3. Restrict allowed hosts and network access.
4. Introduce HTTPS termination and reverse proxy.
5. Add request size limits and strict schema validation.
6. Add audit logs for ingest origin, meter, and request IDs.

## 15. Performance and Scalability Considerations

1. Append-only writes are simple and audit-friendly, but table growth must be managed.
2. Recommended indexes:
  - `meter_id`
  - `(meter_id, timestamp DESC)`
3. Add retention/archival policy for historical rows.
4. Consider async ingest queue for burst handling.
5. Add batching strategy for high-frequency upstream updates.

## 16. Testing Strategy (Suggested)

### 16.1 Unit Tests

1. `_to_float_list` with numeric list.
2. `_to_float_list` with object list containing `predicted_kwh`.
3. `_save_generator_row` required field handling (`meter_id`).
4. Key fallback mapping tests.

### 16.2 Integration Tests

1. POST single object payload.
2. POST list payload.
3. POST `{data: [...]}` payload.
4. Invalid JSON payload behavior.
5. Repeat same `meter_id` and verify row count increments.

## 17. Future Roadmap

1. Introduce authenticated ingestion protocol.
2. Create dedicated history/query APIs for dashboard consumption.
3. Build model/table separation for "latest snapshot" vs "historical series".
4. Add formal OpenAPI/Swagger contract.
5. Add CI pipeline with migration checks and tests.
6. Add deployment manifests (Docker/Compose) and environment profiles.

## 18. Conclusion

The current backend successfully performs its core function: ingesting meter updates from another backend and storing them in PostgreSQL with append-only semantics. The system is functional for development and internal integration and provides a clear base for extending into a production-grade telemetry ingestion platform.

The next phase should focus on security, operational observability, schema cleanup, automated testing, and deployment standardization.
