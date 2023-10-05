FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y --no-install-recommends \
    nginx \
    gunicorn

ENV FLASK_APP=app.py

RUN pip install flask

COPY . /app

WORKDIR /app

EXPOSE 8000

CMD ["gunicorn", "app:app", "-b", "0.0.0.0:8000"]
