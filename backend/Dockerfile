FROM node:lts-alpine

ENV HOME=/app
RUN mkdir /app

COPY package.json $HOME

WORKDIR $HOME
RUN npm i -g @adonisjs/cli 
RUN npm i -g adonis-swagger
RUN npm install 



CMD ["npm", "start"]