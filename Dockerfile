FROM node:dubnium-alpine AS build

RUN apk update && apk add yarn python g++ make && rm -rf /var/cache/apk/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx:stable-alpine
COPY --from=build /app/public /var/www
RUN ls /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
