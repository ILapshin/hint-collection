FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install yarn
RUN yarn install

COPY . .

EXPOSE 3000

ENTRYPOINT yarn start