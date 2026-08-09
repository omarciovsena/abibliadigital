FROM node:16.20.1

WORKDIR /usr/src/api

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .

EXPOSE 3000
