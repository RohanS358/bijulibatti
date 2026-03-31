from django.views.decorators.http import require_GET
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse

# API endpoint to get block id and block details for a given meter_id
@csrf_exempt
@require_GET
def get_block_by_meter(request):
    meter_id = request.GET.get('meter_id')
    if not meter_id:
        return JsonResponse({'status': 'error', 'message': 'meter_id is required'}, status=400)
    try:
        meter = meter_details.objects.select_related('block_id').get(meter_id=meter_id)
    except meter_details.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Meter not found'}, status=404)
    block = meter.block_id
    if not block:
        return JsonResponse({'status': 'error', 'message': 'Block not assigned for this meter'}, status=404)
    block_data = {
        'block_id': block.block_id,
        'latitude_top_left': block.latitude_top_left,
        'longitude_top_left': block.longitude_top_left,
        'latitude_bottom_right': block.latitude_bottom_right,
        'longitude_bottom_right': block.longitude_bottom_right,
    }
    return JsonResponse({'status': 'ok', 'block_id': block.block_id, 'block_details': block_data})
import json
import random

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Generator, block_details, meter_details


# Create your views here.

def home(request):
    return HttpResponse('This is the response from the home view of the web_backend')


def get_meter_details(request):
    meter_id = request.GET.get('meter_id')
    if not meter_id:
        return JsonResponse({'status': 'error', 'message': 'meter_id is required'}, status=400)
    try:
        meter = meter_details.objects.select_related('block_id').get(meter_id=meter_id)
    except meter_details.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Meter not found'}, status=404)

    block_data = None
    if meter.block_id:
        block = meter.block_id
        block_data = {
            'block_id': block.block_id,
            'latitude_top_left': block.latitude_top_left,
            'longitude_top_left': block.longitude_top_left,
            'latitude_bottom_right': block.latitude_bottom_right,
            'longitude_bottom_right': block.longitude_bottom_right,
        }

    meter_data = {
        'meter_id': meter.meter_id,
        'latitude': meter.latitude,
        'longitude': meter.longitude,
        'block_id': meter.block_id.block_id if meter.block_id else None,
    }
    return JsonResponse({'status': 'ok', 'meter_details': meter_data, 'block_details': block_data}) 

def homepage(request):
    return home(request)

def _to_float_list(values, limit):
    cleaned = []
    for value in values or []:
        try:
            cleaned.append(float(value))
        except (TypeError, ValueError):
            continue
        if len(cleaned) >= limit:
            break
    return cleaned


def _save_generator_row(row):
    meter_id = row.get("meter_id")
    if meter_id is None or str(meter_id).strip() == "":
        raise ValueError("meter_id is missing in payload item")

    meter_id = str(meter_id).strip()
    meter_latitude_longitude_val_generator(meter_id)

    try:
        meter_obj = meter_details.objects.get(meter_id=meter_id)
    except meter_details.DoesNotExist as exc:
        raise ValueError(f"meter_details row not found for meter_id={meter_id}") from exc

    consumption_kw = row.get("consumption_kw", row.get("last_true_kwh", row.get("current_consumption_kw", 0.0)))
    predicted_kwh = row.get("predicted_kwh", row.get("last_predicted_kwh", 0.0))
    predicted_24h = row.get("predicted_kwh_24h", row.get("predictions_24h", []))
    predicted_week = row.get("predicted_kwh_week", row.get("predictions_week", []))

    defaults = {
        "consumption_kw": float(consumption_kw),
        "predicted_kwh": float(predicted_kwh),
        "predicted_kwh_24h": _to_float_list(predicted_24h, 24),
        "predicted_kwh_week": _to_float_list(predicted_week, 168),
    }

    Generator.objects.create(meter_id=meter_obj, **defaults)
    return True







@csrf_exempt
@require_http_methods(["POST"])
def fetcher(request):
    # This function receives meter data from another backend and stores it in the DB.
    try:
        payload = json.loads(request.body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return JsonResponse(
            {"status": "error", "message": "Invalid JSON payload."},
            status=400,
        )

    if isinstance(payload, dict) and isinstance(payload.get("data"), list):
        records = payload["data"]
    elif isinstance(payload, list):
        records = payload
    elif isinstance(payload, dict):
        records = [payload]
    else:
        return JsonResponse(
            {"status": "error", "message": "Unsupported payload format from endpoint."},
            status=400,
        )

    created_count = 0
    updated_count = 0
    errors = []

    for row in records:
        if not isinstance(row, dict):
            errors.append("Skipped a non-object payload item")
            continue

        try:
            created = _save_generator_row(row)
            if created:
                created_count += 1
            else:
                updated_count += 1
        except (TypeError, ValueError) as exc:
            meter = row.get("meter_id", "unknown")
            errors.append(f"meter_id={meter}: {exc}")

    return JsonResponse(
        {
            "status": "ok",
            "received": len(records),
            "created": created_count,
            "updated": updated_count,
            "errors": errors,
        },
        status=200 if not errors else 207,
    )




def meter_latitude_longitude_val_generator(meter_id):
    meter_id = str(meter_id).strip()
    if not meter_id:
        return None

    # Generate coordinates in a fixed service area when meter_id is first seen.
    lat = round(random.uniform(8.0, 37.0), 6)
    lon = round(random.uniform(68.0, 97.0), 6)

    details, created = meter_details.objects.get_or_create(
        meter_id=meter_id,
        defaults={"latitude": lat, "longitude": lon},
    )

    if not created and (details.latitude is None or details.longitude is None):
        details.latitude = lat
        details.longitude = lon
        details.save(update_fields=["latitude", "longitude"])

    block_assign(details)

    return {
        "meter_id": details.meter_id,
        "latitude": details.latitude,
        "longitude": details.longitude,
        "created": created,
    }


def block_assign(meter_obj):
    """Assign a block_id to a meter_details row based on lat/lon bounding box."""
    if meter_obj is None or meter_obj.latitude is None or meter_obj.longitude is None:
        return None

    meter_lat = float(meter_obj.latitude)
    meter_lon = float(meter_obj.longitude)

    matched_block_id = None
    for block in block_details.objects.all():
        if None in (
            block.latitude_top_left,
            block.longitude_top_left,
            block.latitude_bottom_right,
            block.longitude_bottom_right,
        ):
            continue

        lat_max = max(block.latitude_top_left, block.latitude_bottom_right)
        lat_min = min(block.latitude_top_left, block.latitude_bottom_right)
        lon_max = max(block.longitude_top_left, block.longitude_bottom_right)
        lon_min = min(block.longitude_top_left, block.longitude_bottom_right)

        if lat_min <= meter_lat <= lat_max and lon_min <= meter_lon <= lon_max:
            matched_block_id = block.block_id
            break

    if meter_obj.block_id != matched_block_id:
        meter_obj.block_id = matched_block_id
        meter_obj.save(update_fields=["block_id"])

    return matched_block_id









































"""
API endpoints:

:5000/predict -> This is to store generate the simulator data.
:5000/health -> status of the simulator

:8000/ -> dashboard login
:8000/api/login -> post method to setup the basic user stuff triggerd by the html.
:8000/api/history -> get he history of the user's can be accessed by the meter_id.
:8000/api/logout -> stop the schedular for the meter.
:8000/api/active_sessions -> gets the active sessions for the user, tells for which user the schedular is running.
:8000/api/dashboard/{meter_id} -> it gives out the json response for the dashboard , NO UI just backend.


    return JSONResponse({
        "meter_id": meter_id,
        "sim_time": session["sim_time"], This particular one is just in context of the simulator, but in future it'll be the actual time of the reading.
        "tick_count": session["tick_count"], This will also not exist in the future.
        "last_true_kwh": session["last_true_kwh"],
        "last_predicted_kwh": session["last_predicted_kwh"],
        "last_error": session["last_error"],
        "model_version": session["model_version"],
        "new_data_since_retrain": session["new_data_since_retrain"],
        "retrain_threshold": RETRAIN_THRESHOLD,
        "status": session["status"],
        "mae": mae,
        "prediction_log": pred_log,
        "predictions_24h": predictions_24h,
        "predictions_week": predictions_week,
        }]



Soup web app is the mobile app. It should send out the data to the backend at the regular intervals and should also be able to create a new user at this side when 
a user is created at mobile. Then the admin dashboard should be able to access the DB at anytime and show the data in UI.
Then the backend should also do additional task as kept in the frontend of the admin.

"""
