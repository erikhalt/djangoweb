from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import requests
import datetime


def landingpage(request):
    
    return render(request,"landingpage.html")