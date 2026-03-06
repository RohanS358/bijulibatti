from django.urls import path
from . import views
from django.urls import include

# URL patterns for the web_backend app
urlpatterns = [
    path('', views.home, name='home'),
    path('homepage/', views.homepage, name='homepage'),
]