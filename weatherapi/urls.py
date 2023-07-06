from django.urls import path

from . import views

urlpatterns = [
    path("",views.testApi, name="weatherapi")
]