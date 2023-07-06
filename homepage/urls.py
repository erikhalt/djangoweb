from django.urls import path

from . import views

urlpatterns = [
    path("", views.sayhello, name="home"),
]