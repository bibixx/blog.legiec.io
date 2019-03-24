FROM node:dubnium-alpine AS build

RUN apk update && apk add yarn python g++ make imagemagick rsync && rm -rf /var/cache/apk/*
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

RUN mkdir /www
RUN rsync -a /app/public_dark/* /www/public_dark/ --exclude 'static/' --exclude 'css/' --exclude 'js/' --exclude 'snippets/'

FROM nginx:1.14-alpine
COPY --from=build /app/public /var/www/public
COPY --from=build /www/public_dark/ /var/www/public_dark
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
