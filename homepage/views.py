from django.shortcuts import render

# Create your views here.
def sayhello(request):
    
    return render(request,"home.html")