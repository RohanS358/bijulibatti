from django.contrib import admin

from .models import Generator, meter_details, user_details, block_details

# Register your models here.

admin.site.register(Generator)
admin.site.register(meter_details)
admin.site.register(user_details)
admin.site.register(block_details)
