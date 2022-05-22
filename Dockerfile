FROM node:16.13.0-alpine3.14

WORKDIR /app

COPY . .
COPY package.json .

RUN npm install

EXPOSE 3000
# COPY ./build .

CMD ["npm","run","dev"]