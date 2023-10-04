FROM node:alpine3.18 as build-step

RUN mkdir -p /app

WORKDIR /app 

COPY package.json /app

RUN npm install

RUN npm install jquery

RUN npm i bootstrap@5.3.2

COPY . /app

RUN npm run build --prod

#step two

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/my-app /usr/share/nginx/html