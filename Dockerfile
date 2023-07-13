FROM python:3.10-alpine AS builder
EXPOSE 5000

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt --no-cache-dir

COPY . .

RUN mkdir -p /static
RUN mkdir -p /var/www/static


CMD ["gunicorn"  , "-b", "0.0.0.0:5000", "mysite.wsgi"]