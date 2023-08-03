from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import requests
import datetime
from .database.tables import Users





def landingpage(request):
    a = Users()
    a.Name = 'TEST'
    a.save()
    
    b = Users.objects.get(pk=1)


    return render(request,"landingpage.html",{'test':b.Name})