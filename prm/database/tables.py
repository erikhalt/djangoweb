from django.db import models


class Users(models.Model):
    Name = models.CharField(max_length=200)
