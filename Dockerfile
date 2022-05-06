FROM node:16.13.0-alpine3.14

WORKDIR /app

COPY ./build .
COPY package.json .

RUN npm install

# COPY ./build .

CMD ["npm","run","start"]