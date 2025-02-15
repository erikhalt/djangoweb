# Generated by Django 4.1.10 on 2023-08-05 17:46

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('prm', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Description', models.CharField(max_length=200)),
                ('userfk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=50)),
                ('Description', models.CharField(max_length=200)),
                ('Stage', models.CharField(choices=[('1', 'To-do'), ('2', 'Planning'), ('3', 'Under Developement'), ('4', 'Done')], max_length=1)),
                ('projectfk', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='prm.project')),
            ],
        ),
    ]
