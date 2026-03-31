# Energy 2.0 Backend - Technical Report

## 1. Executive Summary

Energy 2.0 Backend is a Django + PostgreSQL service that currently provides:

1. Meter telemetry ingestion via a POST API.
2. Meter-to-block lookup via a GET API.
3. Data persistence for generators, meter metadata, users, and geographic blocks.

The backend assigns geographic coordinates to newly seen meters, maps each meter to a block using bounding-box rules, and stores incoming consumption/prediction values in a historical table.

## 2. Scope and Objectives

### 2.1 Current Scope

1. Receive meter updates from upstream/frontend-integrated services.
2. Normalize payload variants into a single storage shape.
3. Persist data in PostgreSQL using Django ORM.
4. Return block details for a given meter identifier.

### 2.2 Primary Objectives

1. Provide a stable ingestion endpoint that accepts flexible payload shapes.
2. Provide a simple lookup endpoint for frontend usage by meter ID.

## 3. Technology Stack

1. Language: Python
2. Framework: Django 5.2.x
3. Database: PostgreSQL
4. ORM: Django ORM
5. PostgreSQL extension use: ArrayField via django.contrib.postgres

## 4. Project Structure

```text
Energy_2.0_backend/
  README.md
  energy_backend/
    manage.py
    energy_backend/
      settings.py
      urls.py
      asgi.py
      wsgi.py
    web_backend/
      models.py
      views.py
      urls.py
      admin.py
      migrations/
```

## 5. Routing and Endpoint Surface

Project-level URL routing includes web_backend at root and admin under /admin/.

### 5.1 Implemented Endpoints

1. GET /
2. GET /homepage/
3. POST /meter_update
4. POST /meter_update/
5. POST /api/fetch/
6. GET /api/get_block_by_meter/?meter_id=<METER_ID>
7. GET/POST /admin/

### 5.2 Endpoint-Wise Request and Response Specification

1. GET /
   - Expected request:
     - Method: GET
     - Query params: none
     - Body: none
   - Response:
     - Status: 200
     - Content-Type: text/html; charset=utf-8
     - Body: This is the response from the home view of the web_backend

2. GET /homepage/
   - Expected request:
     - Method: GET
     - Query params: none
     - Body: none
   - Response:
     - Status: 200
     - Content-Type: text/html; charset=utf-8
     - Body: This is the response from the home view of the web_backend

3. POST /meter_update, POST /meter_update/, POST /api/fetch/
   - Expected request:
     - Method: POST
     - Headers: Content-Type: application/json
     - Body: JSON payload in one of the following shapes:
       - Single object
       - Array of objects
       - Object containing a data array
   - Minimum per record:
     - meter_id is required and must be non-empty.
   - Response:
     - Status: 200 when all rows are valid.
     - Status: 207 when one or more rows fail but request is processed.
     - Status: 400 for invalid JSON or unsupported top-level structure.
     - JSON format:

```json
{
  "status": "ok",
  "received": 1,
  "created": 1,
  "updated": 0,
  "errors": []
}
```

4. GET /api/get_block_by_meter/?meter_id=<METER_ID>
   - Expected request:
     - Method: GET
     - Query params:
       - meter_id (required)
     - Body: none
   - Response:
     - Status: 200 on success with block data.
     - Status: 400 when meter_id is missing.
     - Status: 404 when meter is not found or no block is assigned.
     - Success JSON format:

```json
{
  "status": "ok",
  "block_id": "BLK-01",
  "block_details": {
    "block_id": "BLK-01",
    "latitude_top_left": 28.61,
    "longitude_top_left": 77.19,
    "latitude_bottom_right": 28.58,
    "longitude_bottom_right": 77.24
  }
}
```

## 6. Data Model Report

### 6.1 Generator

Purpose: Stores incoming meter consumption and prediction snapshots.

Fields:

1. id (AutoField, primary key)
2. meter_id (ForeignKey -> meter_details)
3. consumption_kw (FloatField)
4. predicted_kwh (FloatField)
5. predicted_kwh_24h (ArrayField(FloatField), size 24)
6. predicted_kwh_week (ArrayField(FloatField), size 168)
7. timestamp (DateTimeField, auto_now_add)

### 6.2 meter_details

Purpose: Stores meter identity and geo-assignment state.

Fields:

1. meter_id (CharField, primary key)
2. latitude (FloatField, nullable)
3. longitude (FloatField, nullable)
4. block_id (ForeignKey -> block_details, nullable)

### 6.3 user_details

Purpose: Stores user profile linked to one meter.

Fields:

1. meter_id (OneToOneField -> meter_details, primary key)
2. user_name (CharField)
3. email (EmailField)
4. contact_number (CharField)

### 6.4 block_details

Purpose: Stores block boundary coordinates used for meter mapping.

Fields:

1. block_id (CharField, primary key)
2. latitude_top_left (FloatField, nullable)
3. longitude_top_left (FloatField, nullable)
4. latitude_bottom_right (FloatField, nullable)
5. longitude_bottom_right (FloatField, nullable)

## 7. API Contract - Ingestion Endpoint

### 7.1 Endpoint

POST /meter_update

Aliases:

1. POST /meter_update/
2. POST /api/fetch/

### 7.2 Supported Request Shapes

1. Single object
2. List of objects
3. Object with data array

### 7.3 Required and Optional Keys per Record

Required:

1. meter_id

Optional with fallback handling:

1. consumption_kw or last_true_kwh or current_consumption_kw
2. predicted_kwh or last_predicted_kwh
3. predicted_kwh_24h or predictions_24h
4. predicted_kwh_week or predictions_week

### 7.4 Example Request

```json
{
  "meter_id": "MTR-1001",
  "last_true_kwh": 2.14,
  "last_predicted_kwh": 2.05,
  "predictions_24h": [1.9, 2.1, 2.0],
  "predictions_week": [2.0, 1.95, 2.05]
}
```

### 7.5 Example Response

```json
{
  "status": "ok",
  "received": 1,
  "created": 1,
  "updated": 0,
  "errors": []
}
```

### 7.6 Ingestion Processing Notes

1. The service auto-creates missing meter_details rows for unseen meter_id values.
2. Random latitude/longitude are generated once when meter appears first time.
3. Block assignment is computed by matching meter coordinates against block bounding box.
4. Each valid record currently creates a new Generator row (append-style history).

## 8. API Contract - Meter to Block Lookup

### 8.1 Endpoint

GET /api/get_block_by_meter/?meter_id=<METER_ID>

### 8.2 Request Format

1. Method: GET
2. Input: meter_id as query parameter
3. Body: none required

Example:

```http
GET /api/get_block_by_meter/?meter_id=MTR-1001
```

### 8.3 Success Response (200)

```json
{
  "status": "ok",
  "block_id": "BLK-01",
  "block_details": {
    "block_id": "BLK-01",
    "latitude_top_left": 28.61,
    "longitude_top_left": 77.19,
    "latitude_bottom_right": 28.58,
    "longitude_bottom_right": 77.24
  }
}
```

### 8.4 Error Responses

1. 400: meter_id is required
2. 404: Meter not found
3. 404: Block not assigned for this meter

## 9. Environment Configuration Snapshot

Current key settings:

1. DEBUG = True
2. Database engine = django.db.backends.postgresql
3. Database name = energy_sem_project
4. DB host/port = localhost:5432
5. Installed app dependency includes django.contrib.postgres

## 10. Setup and Run Instructions

### 10.1 Prerequisites

1. Python 3.11+
2. PostgreSQL running locally
3. Database created and accessible with configured credentials

### 10.2 Install Dependencies

```bash
pip install django psycopg2-binary
```

### 10.3 Apply Migrations

```bash
cd energy_backend
python manage.py migrate
```

### 10.4 Run Development Server

```bash
python manage.py runserver
```

Server default URL:

http://127.0.0.1:8000/

## 11. Verification Checklist

1. POST sample payload to /meter_update and confirm success response.
2. Verify Generator rows are being inserted for each valid record.
3. Call GET /api/get_block_by_meter/?meter_id=<METER_ID> for an existing meter.
4. Validate block_id and block_details in response.

## 12. Current Limitations and Risks

1. No endpoint authentication/authorization implemented.
2. Credentials and secret key are hardcoded in settings.
3. DEBUG mode enabled.
4. No formal OpenAPI/Swagger contract yet.
5. Limited automated tests in current repository state.

## 13. Recommended Next Steps

1. Move secrets and DB credentials to environment variables.
2. Add API authentication (API key or token-based).
3. Add unit and integration tests for both endpoints.
4. Add API schema documentation (OpenAPI).
5. Add request validation layer for stricter contracts.

## 14. Conclusion

The backend now exposes both ingestion and meter-to-block lookup capabilities suitable for frontend integration. The implemented API surface supports receiving meter telemetry and serving block mapping data by meter_id, with clear response contracts for success and error conditions.
