FROM python:3.10-alpine AS builder
EXPOSE 5000
RUN apt update -y
RUN apt install pkg-config -y

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt --no-cache-dir

COPY . .

RUN mkdir -p /static
RUN mkdir -p /var/www/static

RUN chmod +x entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]