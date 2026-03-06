from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.

def home(request):
    return HttpResponse('This is the response from the home view of the web_backend')

def homepage(request):
    return HttpResponse("Response -> homepage")