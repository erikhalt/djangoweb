from django.urls import path

from . import views

urlpatterns = [
    path("",views.landingpage, name="prmlandingpage"),
    path("login",views.loginview, name="loginview"),
    path("logout",views.logoutview, name="logoutview"),
    path("projects",views.project, name="projects"),
    path("signup",views.signupview, name="signupview"),
    path("projects/new",views.newproject,name="createproject")
]