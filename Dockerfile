FROM node:12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/ ./src/

RUN npm ci --only=production

CMD ["npm", "run", "start"]
