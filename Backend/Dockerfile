FROM python:3.10-alpine

WORKDIR /app

COPY . .

RUN pip install flask

RUN pip install gunicorn

RUN gunicorn -c gunicorn.conf.py app:app