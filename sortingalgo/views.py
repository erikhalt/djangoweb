from django.shortcuts import render
import random

# Create your views here.
def sorting(request):
    list = []
    for i in range(40):
        list.append(0)
    length = len(list)

    return render(request,"sorting.html",{'data':list,'lengthofdata':length})