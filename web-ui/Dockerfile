FROM node:18.16-alpine

# install apk and rsync
RUN apk update
RUN apk add rsync

# set working directory
WORKDIR /usr/src/cache

# copy and install app dependencies
COPY ./package.json ./yarn.lock ./
RUN yarn install

# change working directory
WORKDIR /usr/src/app/

EXPOSE 3000