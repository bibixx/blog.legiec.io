# FROM node:carbon-alpine AS build
FROM node:alpine AS build

WORKDIR /app
COPY . .

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/public /var/www
RUN ls /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
