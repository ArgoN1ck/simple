#!/bin/bash
set -e
source ./set-env.sh
export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml down
docker volume rm simple-postgres-volume --force
docker volume rm simple-redis-volume --force
