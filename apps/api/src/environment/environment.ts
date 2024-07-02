import { get } from 'env-var';

export const environment = {
  production: get('NODE_ENV').required().asString() === 'production',
  app: {
    port: get('PORT').required().asPortNumber(),
    host: get('HOST').required().asString(),
  },
  auth: {
    secret: get('JWT_SECRET').required().asString(),
    issuerUrl: get('JWT_ISSUER_URL').required().asUrlString(),
    audienceUrl: get('JWT_AUDIENCE_URL').required().asUrlString(),
    accessTokenExpiresIn: get('JWT_ACCESS_TOKEN_TTL').required().asInt(),
  },
  database: {
    username: get('PSQL_USERNAME').required().asString(),
    password: get('PSQL_PASSWORD').required().asString(),
    port: get('PSQL_PORT').required().asPortNumber(),
    host: get('PSQL_HOST').required().asString(),
    name: get('PSQL_DATABASE').required().asString(),
  },
  cache: {
    port: get('REDIS_PORT').required().asPortNumber(),
    host: get('REDIS_HOST').required().asString(),
  },
  pinoLogger: {
    level:
      get('NODE_ENV').required().asString() === 'production'
        ? 'debug'
        : 'trace',
  },
};
