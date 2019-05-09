## STAGE 2: Build Angular Application ##
FROM node:10 as builder

COPY . /angular_app

WORKDIR /angular_app

RUN npm config set registry http://packages.hav.cu:8081/repository/npm-proxy/

RUN npm install node-sass --loglevel verbose

RUN npm install -g @angular/cli

RUN npm install  --loglevel verbose

RUN npm rebuild node-sass --loglevel verbose

RUN $(npm bin)/ng build

## STATE 2: Run nginx to server ##

FROM nginx:latest

COPY --from=builder /angular_app/dist/* /usr/share/nginx/html/

EXPOSE 8080