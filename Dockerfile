FROM python:3.10-alpine AS builder
EXPOSE 5000
RUN apk update
RUN apk add pkgconfig
RUN apk add mysql mysql-client
COPY requirements.txt requirements.txt
RUN apk add --no-cache gcc musl-dev  pkgconf mariadb-dev 
RUN apk add --no-cache mariadb-connector-c-dev 
RUN pip install --no-cache-dir -r requirements.txt 




COPY . .

RUN mkdir -p /static
RUN mkdir -p /var/www/static

RUN chmod +x entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]