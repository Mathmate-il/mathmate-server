FROM node:alpine AS development

WORKDIR  /user/src/app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR  /user/src/app

COPY package*.json ./
COPY prisma ./prisma/ 

RUN npm install 

COPY --from=development /user/src/app/dist ./dist

CMD ["node", "dist/src/main"]
