from django.shortcuts import render,redirect
from .database.tables import PRMuser,Project,Task
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .decorators import project_auth

@csrf_exempt
def loginview(request):
    error = []
    if request.method== 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request,username=username,password=password)

        if user is not None:
            login(request,user)
            return redirect('prmlandingpage')
        else:
            error.append('Can not find any matching users')
    
    if len(error) > 0:
        errorbool = True
    else:
        errorbool = False
    return render(request,"login.html",{'errors':error,'errorbool':errorbool})


@login_required(login_url='loginview')
def landingpage(request):
    return render(request,"landingpage.html")


@login_required(login_url='loginview')    
def logoutview(request):

    logout(request)

    return redirect('prmlandingpage')


@csrf_exempt
def signupview(request):
    error = []
    if request.user.is_authenticated:
        return redirect('prmlandingpage')
    
    if request.method == 'POST':
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if password1 == password2 and PRMuser.objects.filter(username=username).exists() != True:
            newuser = PRMuser()
            newuser.username = username
            newuser.set_password(raw_password=password1)
            newuser.save()
            return redirect('prmlandingpage')
        
        if password1 != password2:
            error.append('Password did not match')

        if PRMuser.objects.filter(username=username).exists():
            error.append('Username is taken')
    if len(error) > 0:
        errorbool = True
    else:
        errorbool = False

    return render(request,"signup.html",{'errors':error,'errorbool':errorbool})


@login_required(login_url='loginview')
def project(request):
    user = request.user
    projects = Project.objects.filter(userfk_id = user.id)
    return render(request,'projects.html',{'projects':projects})

@csrf_exempt
@login_required(login_url='loginview')
def newproject(request):
    user = request.user
    if request.method == 'POST':
        name = request.POST['name']
        desc = request.POST['Description']

        pr = Project()
        pr.Name = name
        pr.Description = desc
        pr.userfk = PRMuser.objects.get(pk=user.id)
        pr.save()

        return redirect('projects')
    return render(request,"newproject.html")


@csrf_exempt
@project_auth
@login_required(login_url='loginview')
def activeproject(request,projectid):
    active_project = Project.objects.get(id=projectid)
    active_task = None
    if request.method == 'POST':
        task = Task()
        task.Stage = 1
        task.Name = request.POST['Name']
        task.Description = request.POST['Description']
        task.projectfk = active_project
        task.save()
    
    try:
        active_task = Task.objects.filter(projectfk_id=projectid)  
    except:
        pass
    
    dict = {
        'active_project':active_project,
        'active_task':active_task,
    }
    return render(request,'activeproject.html',dict)