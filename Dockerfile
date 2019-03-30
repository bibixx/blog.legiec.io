FROM node:dubnium-alpine AS build

RUN apk update && apk add yarn imagemagick && rm -rf /var/cache/apk/*
RUN npm config set scripts-prepend-node-path true

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY scaffolds/ ./scaffolds/
COPY source/ ./source/
COPY themes/ ./themes/
COPY _config*.yml ./

ENV NODE_ENV production

RUN yarn generate
RUN yarn img

FROM nginx:1-alpine
COPY --from=build /app/public /var/www/public
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
