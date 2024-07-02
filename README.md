# Simple

Simple API

## Table of Contents

- [Installation](#installation)

- [Configuration](#configuration)

- [Running the app](#running-the-app)

- [Test](#test)

- [Database Management](#database-management)

## Installation

To get started with Simple, you need to have any Linux distributions, Node.js and npm (Node Package Manager) installed on your machine.

1. Clone the repository:

```bash

git clone https://github.com/ArgoN1ck/simple.git

```

2. Navigate to the project directory:

```bash

cd simple

```

3. Install the dependencies:

```bash

npm install

```

4. Navigate to the devops directory

```bash

cd devops

```

5. Install the dependencies:

```bash

npm install

```

## Configuration

Before running the application, you need to set up the environment variables. But repository provides configured environments. See .env file:

```dotenv

NODE_ENV=development
HOST=0.0.0.0
PORT=3333

PSQL_HOST=localhost
PSQL_USERNAME=postgres
PSQL_PASSWORD=root
PSQL_DATABASE=postgres

REDIS_HOST=simple-redis
REDIS_PORT=6379

JWT_SECRET=topsecretkeyword
JWT_ISSUER_URL=http://localhost:3333/
JWT_AUDIENCE_URL=http://localhost:3333/
JWT_ACCESS_TOKEN_TTL=36000

```

## Running the app

To run the application, you need to navigate to devops directory.There are several options:

### Development

To start the app in development mode with hot-reloads enabled:

```bash
npm run docker:dev:up
```

### Production

To build and run the app in production mode:

```bash
npm run docker:prod:up
```

## Database Management

Simple uses TypeORM and FlywayDB to run migrations. You can use the following commands to manage your database migrations:

### Run migrations

```bash
npm run migration:run
```

## Test

To run the tests navigate to devops folder, run dev or prod infrastructure and execute command:

```bash
npm run test
```
