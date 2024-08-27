## Overview

The `docker-compose.yml` file consists of two services:
- `postgres`
- `api`

## `postgres` service

## `api` service
This service is built out of the `Dockerfile` and is responsible for creating api server, running migrations 
on `postgres` service. The project contains seeds, models (staging), macros

## Prerequisites

Before getting started, make sure you have the following prerequisites installed:

- Docker
- Node.js 20.>
- Typescript


## How to Use

###  1. Clone the project repository to your local machine.

```bash
git clone https: https://github.com/sargsyanvlad/zoftify_test.git
git clone ssh: git@github.com:sargsyanvlad/zoftify_test.git
```
### 2. Navigate to the project directory.
### 3. prepare env variable
For dev purposes it's enough to just copy env-example to .env

### 4.  Running the project
First, let's build the services defined in our `docker-compose.yml` file:

```bash
docker-compose build
```

and now let's run the services so that the dbt models are created in our target Postgres database:

```commandline
docker-compose up
```

This will spin up two containers namely `api` (out of the `zoftify_test	` image) and `postgres` (out of the
`zoftify_test-postgres` image).

Notes:
- For development purposes, both containers will remain up and running
- API Docs are exposed on APP_HOST:APP_PORT/docs# path
- If you would like to end the `zoftify_test` container, feel free to remove the `&& sleep infinity` in `CMD` command of the
  `Dockerfile`

