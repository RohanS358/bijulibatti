from django.contrib import admin

from .models import Substation, Transformer, Meter, EnergyReading, TransformerReading

# Register your models here.

admin.site.register(Substation)
admin.site.register(Transformer)
admin.site.register(Meter)
admin.site.register(EnergyReading)
admin.site.register(TransformerReading)