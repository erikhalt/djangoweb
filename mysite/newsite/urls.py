from django.urls import path

from . import views

urlpatterns = [
    path("", views.sayhello, name="index"),
    path("weatherapi",views.testApi, name="weather")
]