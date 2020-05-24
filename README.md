# Courier Service

## Environment variables

* **WEBSERVER_PORT**: port to use when starting the webserver. Defaults to 8080
* **DATABASE_HOST**: host of the postgres instance. Defaults to localhost
* **DATABASE_PORT**: port of the postgres instance. Defaults to 5432
* **DATABASE_USER**: username to connect to the postgres db. Defaults to courier_db
* **DATABASE_PASSWORD**: password to connect to the postgres db. Defaults to Password1!
* **DATABASE_NAME**: database name to use in the postgres instance. Defaults to courier_db

## Start locally

Developed against Node.js v12.

To install local dependencies
```
npm install
```

To start the service locally with autoreload
```
npm run dev
```
This will also read any environment variable written in a `.env` file

It requires the running instance of the postgres database, that can be run with
```
docker-compose up -d postgres
```

## Start dockerized

The docker-compose file offers a complete environment, and it can be started running
```
docker-compose up -d --build
```

## Interact with the service

Examples using `httpie`:

create a message
```
http POST :8080/api/messages content="Can I get help?" customerId=1 'os:macOS Catalina' 'appVersion:v2.2.0' 'language:it'
```

list messages by operating system
```
http :8080/api/messages os==macOS
```
