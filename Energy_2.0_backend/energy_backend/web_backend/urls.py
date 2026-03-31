from django.urls import path
from . import views
from django.urls import include

# URL patterns for the web_backend app
urlpatterns = [
    path('', views.home, name='home'),
    path('homepage/', views.homepage, name='homepage'),
    path('meter_update', views.fetcher, name='meter_update'),
    path('meter_update/', views.fetcher),
    path('api/fetch/', views.fetcher, name='fetcher'),
    path('api/get_block_by_meter/', views.get_block_by_meter, name='get_block_by_meter'),
    path('api/get_meter_details/', views.get_meter_details, name='get_meter_details'),
 ]