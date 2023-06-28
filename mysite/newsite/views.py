from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import requests

def sayhello(request):
    
    return render(request,"home.html")

city = 'Vasteras'

@csrf_exempt
def testApi(request):
    global city
    if request.method == 'POST':
        city = request.POST['city']

    realtime = realtimeWeather(city)
  
    realtime_object = weather_realtime_handler(realtime['location'],realtime['current'])



    dic = {'city':city,'realtime_weather':realtime_object}
    return render(request,"weather.html",dic)






















def realtimeWeather(city):
    url = "https://weatherapi-com.p.rapidapi.com/current.json"

    querystring = {"q":f'{city}'}

    headers = {
    	"X-RapidAPI-Key": "a5e5ed7384msh0a94497fee45d8ep117483jsn42c4c17a9927",
        	"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
    
    response = requests.get(url, headers=headers, params=querystring)
    print(response.json())

    return response.json()


def threedayforecast(city):
    url = "https://weatherapi-com.p.rapidapi.com/forecast.json"

    querystring = {"q":f'{city}',"days":"3"}

    headers = {
    	"X-RapidAPI-Key": "a5e5ed7384msh0a94497fee45d8ep117483jsn42c4c17a9927",
    	"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    print(response.json())
    return response.json()


class weather_realtime_handler():
    def __init__(self,location,current):
        
        self.temp = current['temp_c']
        condition = current['condition']
      
        self.condition_text = condition['text']
        self.condition_img = condition['icon']

        self.city_name = location['name']
        self.city_region = location['region']
        self.local_time = location['localtime']

