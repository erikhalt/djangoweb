FROM python:3.10-alpine AS builder
EXPOSE 5000
RUN apk update
RUN apk add pkgconfig
RUN apk add mysql mysql-client
COPY requirements.txt requirements.txt
RUN apk add --no-cache --virtual build-deps gcc musl-dev libffi-dev2 pkgconf mariadb-dev && \
    apk add --no-cache mariadb-connector-c-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del build-deps



COPY . .

RUN mkdir -p /static
RUN mkdir -p /var/www/static

RUN chmod +x entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]