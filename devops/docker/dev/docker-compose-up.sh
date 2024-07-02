#!/bin/bash
set -e
source ./set-env.sh

docker volume create --name=simple-postgres-volume --label=simple-postgres-volume
docker volume create --name=simple-redis-volume --label=simple-redis-volume

export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d simple-postgres

until docker exec --tty $(docker ps -aqf "name=simple-postgres") pg_isready -U ${PSQL_USERNAME}; do
    echo "Waiting for postgres..."
    sleep 2
done

export PSQL_PORT=5432
export PSQL_HOST=localhost
export PSQL_URL=postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}?schema=public

cd ..
npm run migration:run
cd devops

export PSQL_HOST=simple-postgres
export PSQL_URL=postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}?schema=public

export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d
