# YouApp Backend

## Technologies

- NestJS v10
- MongoDB v10
- RabbitMQ V3
- Docker
- Typescript
- JWT Token

## Requirement

- NodeJS v20
- Docker

## Features

- Register new user
- Login user that return a JWT Token
- CRUD Profile
- Realtime chat use RabbitMQ

## Setup Local

- Clone this project
- Run `npm i` to install all dependencies
- Run `docker compose up -d` to start docker container (MongoDB and RabbitMQ)
- Run application with command `npm run start:dev` in port `3000`

## API Documentation

- Swagger - [http://localhost:3000/](http://localhost:3000/)
- Postman - [https://documenter.getpostman.com/view/9840862/2sA35Mwxi3](https://documenter.getpostman.com/view/9840862/2sA35Mwxi3)
