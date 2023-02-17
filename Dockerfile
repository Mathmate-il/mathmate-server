FROM node:alpine AS development

WORKDIR  /user/src/app

COPY package*.json ./

RUN npm install