from django.shortcuts import render,redirect
from .database.tables import PRMuser
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

def landingpage(request):
    
    user = request.user

    return render(request,"landingpage.html",{'user':user})


@csrf_exempt
def loginview(request):
    error = []
    if request.method== 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username,password=password)

        if user is not None:
            login(request,user)
            return landingpage(request)
        else:
            error.append('Can not find any matching users')

    return render(request,"login.html",{'errors':error})


@login_required(login_url='loginview')    
def logoutview(request):

    logout(request)

    return landingpage(request)


@login_required(login_url='loginview')
def project(request):

    return render(request,'projects.html')


@csrf_exempt
def signupview(request):
    error = []
    if request.user.is_authenticated:
        return landingpage(request)
    
    if request.method == 'POST':
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 == password2 and PRMuser.objects.filter(username=username).exists() != True:
            newuser = PRMuser()
            newuser.username = username
            newuser.set_password(raw_password=password1)
            newuser.save()
            return landingpage(request)
        
        if password1 != password2:
            error.append('Password did not match')

        if PRMuser.objects.filter(username=username).exists():
            error.append('Username is taken')

    return render(request,"signup.html",{'errors':error})