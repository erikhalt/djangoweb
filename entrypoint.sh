#!/bin/sh
python manage.py migrate
gunicorn -b 0.0.0.0:5000 mysite.wsgi