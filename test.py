import requests,json

url = "https://weatherapi-com.p.rapidapi.com/current.json"

querystring = {"q":"Vasteras"}

headers = {
	"X-RapidAPI-Key": "a5e5ed7384msh0a94497fee45d8ep117483jsn42c4c17a9927",
	"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)
q = response.json()['current']

print(q)