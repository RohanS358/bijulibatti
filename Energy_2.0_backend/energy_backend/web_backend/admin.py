from django.contrib import admin

from .models import Substation, Transformer, Meter, EnergyReading, TransformerReading, Generator, MeterID, meter_details, user_details

# Register your models here.

admin.site.register(Substation)
admin.site.register(Transformer)
admin.site.register(Meter)
admin.site.register(EnergyReading)
admin.site.register(TransformerReading)
admin.site.register(Generator)
admin.site.register(MeterID)
admin.site.register(meter_details)
admin.site.register(user_details)
