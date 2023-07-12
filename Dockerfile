FROM python:3.10-alpine AS builder
EXPOSE 5000
WORKDIR /app 
COPY requirements.txt /app

RUN pip3 install -r requirements.txt --no-cache-dir
COPY . /app 
ENTRYPOINT ["python3"] 
CMD ["manage.py", "runserver", "0.0.0.0:5000"]
