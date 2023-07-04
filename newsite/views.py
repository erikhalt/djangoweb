from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import requests
import datetime

def sayhello(request):
    
    return render(request,"home.html")

city = 'Vasteras'
days = 3

@csrf_exempt
def testApi(request):
    global city,days
    if request.method == 'POST':
        city = request.POST['city']
        days = request.POST['days']

    realtime = realtimeWeather(city)
    realtime_object = weather_realtime_handler(realtime['location'],realtime['current'])

    curr_date = datetime.datetime.now()
    comingdays = []
    weekdays = []

    for i in range(int(days)):
        curr_date += datetime.timedelta(days=1)
        comingdays.append(curr_date.strftime('%Y-%m-%d'))
        weekdays.append(curr_date.strftime('%A'))

    forecast_api_return = []
    for day in comingdays:
        forecast_api_return.append(threedayforecast(city,day))

    forecast_objects = []
    for idx,apireturn in enumerate(forecast_api_return):
        forecast_objects.append(weahter_forecast_handler(apireturn,weekdays[idx]))

    dic = {'city':city,'realtime_weather':realtime_object,'forecastlist':forecast_objects,'inputdays':days}
    return render(request,"weather.html",dic)






















def realtimeWeather(city):
    url = "https://weatherapi-com.p.rapidapi.com/current.json"
    querystring = {"q":f'{city}'}
    headers = {
    	"X-RapidAPI-Key": "a5e5ed7384msh0a94497fee45d8ep117483jsn42c4c17a9927",
        	"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()


def threedayforecast(city,date):
    url = "https://weatherapi-com.p.rapidapi.com/forecast.json"
    querystring = {"q":f'{city}','dt':date}
    headers = {
    	"X-RapidAPI-Key": "a5e5ed7384msh0a94497fee45d8ep117483jsn42c4c17a9927",
    	"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    return response.json()['forecast']['forecastday'][0]['day']



class weather_realtime_handler():
    def __init__(self,location,current):
        
        self.temp = current['temp_c']
        condition = current['condition']
      
        self.condition_text = condition['text']
        self.condition_img = condition['icon']

        self.city_name = location['name']
        self.city_region = location['region']
        self.local_time = location['localtime']



class weahter_forecast_handler():
    def __init__(self,apireturn,name):
        self.weekday_name = name
        self.min_temp = apireturn['maxtemp_c']
        self.max_temp = apireturn['mintemp_c']
        self.avg_temp = apireturn['avgtemp_c']
        
        self.chance_of_rain = apireturn['daily_chance_of_rain']
        self.condition_icon = apireturn['condition']['icon']