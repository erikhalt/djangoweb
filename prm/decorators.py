from .database.tables import PRMuser,Project,Task
from django.shortcuts import HttpResponse




def project_auth(view_func):
    def wrapper(request,projectid):
        project = Project.objects.get(id=projectid)
        if request.user.id == project.userfk_id:
            return view_func(request,projectid)
        else:
            return HttpResponse('Error-403: Permission denied',status=403)
    return wrapper

