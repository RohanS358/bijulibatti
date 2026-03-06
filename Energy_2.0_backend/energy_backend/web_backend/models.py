from django.db import models

# Create your models here.
class Substation(models.Model):
    substation_id = models.CharField(max_length = 50, primary_key = True)
    name = models.CharField(max_length = 100)
    location = models.CharField(max_length = 225)
    longitude = models.FloatField(null = True, blank = True)
    latitude = models.FloatField(null = True, blank = True)
    def __str__(self): 
        return self.name # The string representation of the Substation object will be its name.

class Transformer(models.Model):
    transformer_id = models.CharField(max_length = 50, primary_key = True)
    substation = models.ForeignKey(Substation, on_delete=models.CASCADE, related_name = 'transformers') # This creates a foreign key relationship to the Substation model. If a substation is deleted, all associated transformers will also be deleted (CASCADE).
    capacity_kw = models.FloatField()
    latitude = models.FloatField(null = True, blank = True)
    longitude = models.FloatField(null = True, blank = True)
    def __str__(self):
        return self.transformer_id

class Meter(models.Model):
    meter_id = models.CharField(max_length = 50, unique = True)
    consumer_id = models.IntegerField(null = True, blank = True, help_text = "Consumer ID from source system")
    transformer = models.ForeignKey(Transformer, on_delete=models.CASCADE)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank= True)
    # Short-term predictions
    prediction_hour_1_kw = models.FloatField(default = 0, help_text = "Predicted consumption 1 hour from now")
    prediction_hour_2_kw = models.FloatField(default = 0, help_text = "Predicted consumption 2 hours from now")
    prediction_hour_3_kw = models.FloatField(default = 0, help_text = "Predicted consumption 3 hours from now")
    prediction_hour_4_kw = models.FloatField(default = 0, help_text = "Predicted consumption 4 hours from now")
    prediction_hour_5_kw = models.FloatField(default = 0, help_text = "Predicted consumption 5 hours from now")
    prediction_hour_6_kw = models.FloatField(default = 0, help_text = "Predicted consumption 6 hours from now")
    # Longer-term predictions
    prediction_next_day_kwh = models.FloatField(default = 0, help_text="Predicted total consumption for next 24 hours in kwh")
    prediction_next_week_kwh = models.FloatField(default = 0, help_text = "Predicted total comsuption for next 7 days in kwh")
    prediction_next_month_kwh = models.FloatField(default = 0, help_text = "Predicted total consumption for next month in kwh")
    prediction_next_year_kwh = models.FloatField(default = 0, help_text = "Predicted total consumption for next year in kwh")
    def __str__(self):
        return self.meter_id


class EnergyReading(models.Model):
    meter = models.CharField(max_length = 50)
    timestamp = models.DateTimeField()
    # Current consumtion in kW
    current_consumption_kw = models.FloatField(default = 0.0, help_text = "Current energy consumption in kW")
    class Meta:
        ordering = ["-timestamp"] # Thiw will order the energy reading by timestamp in descending order,i.e. recent reading will come first.

class TransformerReading(models.Model):
    transformer = models.ForeignKey(Transformer, on_delete=models.CASCADE)
    load_kw = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add = True)
    class Meta:
        ordering = ["-timestamp"] 


