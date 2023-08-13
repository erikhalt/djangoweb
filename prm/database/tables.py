from django.db import models
from django.contrib.auth.models import AbstractUser

class PRMuser(AbstractUser):
    
    def __str__(self):
        return self.username
    

class Project(models.Model):
    Name = models.CharField(max_length=50,null=False)
    Description = models.CharField(max_length=200)
    userfk = models.ForeignKey(PRMuser,on_delete=models.CASCADE)


class Task(models.Model):
    taskstages = [
        ('1','To-do'),
        ('2','Planning'),
        ('3','Under Developement'),
        ('4','Done'),
    ]
    Name = models.CharField(max_length=50,null=False)
    Description = models.CharField(max_length=200)
    Stage = models.CharField(choices=taskstages,max_length=1)
    projectfk = models.ForeignKey(Project,on_delete=models.CASCADE)