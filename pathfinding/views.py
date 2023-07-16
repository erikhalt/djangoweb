from django.shortcuts import render

# Create your views here.

def pathfinding(request):
    number_of_points = []
    for i in range(2500):
        number_of_points.append(i)

  


    return render(request,"pathfinding.html",{'number_of_points':number_of_points})