FROM node:latest

WORKDIR /app

COPY bff/package*.json ./ 
COPY bff/server.js ./ 

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
