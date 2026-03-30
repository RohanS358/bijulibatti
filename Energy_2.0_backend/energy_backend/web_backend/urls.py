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
]