FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8082

EXPOSE 8082

CMD [ "npm", "run", "dev" ]