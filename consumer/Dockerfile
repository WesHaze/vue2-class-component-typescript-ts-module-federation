FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8084

EXPOSE 8084

CMD [ "npm", "run", "start" ]