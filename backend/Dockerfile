FROM node:20-alpine

WORKDIR /backend 

# Containerize our All folder content Except the Node Modules
COPY package*.json ./
RUN npm ci
COPY . .



EXPOSE 3000

CMD ["node", "server.js"]