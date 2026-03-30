from pyexpat import model

from django.db import models
from django.contrib.postgres.fields import ArrayField
from sympy import true

# Create your models here.
class Generator(models.Model): # use
    id = models.AutoField(primary_key = True)
    meter_id = models.ForeignKey('meter_details', on_delete=models.CASCADE)
    consumption_kw = models.FloatField(default = 0.0, help_text = "Current energy consumption in kW")
    predicted_kwh = models.FloatField(default = 0.0, help_text = "Predicted energy consumption for next hour in kWh")
    predicted_kwh_24h = ArrayField(models.FloatField(), default=list, help_text = "Predicted energy consumption for next 24 hours in kWh", size = 24)
    predicted_kwh_week = ArrayField(models.FloatField(), default=list, help_text = "Predicted energy consumption for next week in kWh", size = 168) # 24 hours * 7 days = 168 hours in a week
    timestamp = models.DateTimeField(auto_now_add = True)  


class meter_details(models.Model):
    meter_id = models.CharField(primary_key = True, max_length = 50)
    latitude = models.FloatField(null = True, blank = True)
    longitude = models.FloatField(null = True, blank = True)
    block_id = models.ForeignKey('block_details', on_delete=models.SET_NULL, null = True, blank = True)



class user_details(models.Model):
    meter_id = models.OneToOneField('meter_details', on_delete=models.CASCADE, primary_key = True)
    user_name = models.CharField(max_length = 100)
    email = models.EmailField()
    contact_number = models.CharField(max_length = 20)

class block_details(models.Model):
    block_id = models.CharField(primary_key=True, max_length = 50)
    latitude_top_left = models.FloatField(null = True, blank = True)
    longitude_top_left = models.FloatField(null = True, blank = True)
    latitude_bottom_right = models.FloatField(null = True, blank = True)
    longitude_bottom_right = models.FloatField(null = True, blank = True)





