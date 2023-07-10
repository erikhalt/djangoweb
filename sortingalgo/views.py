from django.shortcuts import render
import random

# Create your views here.
def sorting(request):
    list = []
    for i in range(40):
        list.append(random.randint(10,80))


    return render(request,"sorting.html",{'data':list})