import { RedisClientModule } from '@argotools/redis-client';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestfulAuthGuard } from '@simple/auth';
import { HttpCoreExceptionFilter } from '@simple/core/filters';
import { HashingModule } from '@simple/shared/modules/hashing';
import * as entities from '@simple/typeorm/entities';
import { LoggerModule } from 'nestjs-pino';

import { environment } from '../environment/environment';
import { ENTITIES_TOKEN } from './configs/typeorm/entities.token';
import { TypeOrmConfigService } from './configs/typeorm/typeorm.config';
import { ArticleModule } from './modules/article/article.module';
import { ArticleModuleConfigurationService } from './modules/article/config/configuration.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthModuleConfigurationService } from './modules/auth/config/configuration.service';
import { UserModuleConfigurationService } from './modules/user/config/configuration.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: environment.pinoLogger.level,
        formatters: {
          level: (label) => ({ level: label }),
        },
        customProps: () => ({
          context: 'PinoLoggerInterceptor',
        }),
        hooks: {
          logMethod: function (
            inputArgs: any[],
            // eslint-disable-next-line @typescript-eslint/ban-types
            method: Function
          ): void {
            if (inputArgs.length >= 1) {
              const record = inputArgs.shift() || {};
              const arg2 = inputArgs.shift();

              return method.apply(this, [record, arg2, ...inputArgs]);
            }
            return method.apply(this, inputArgs);
          },
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      extraProviders: [
        { provide: ENTITIES_TOKEN, useValue: Object.values(entities) },
      ],
    }),
    RedisClientModule.forRoot({
      config: {
        host: environment.cache.host,
        port: environment.cache.port,
      },
    }),
    HashingModule,

    AuthModule.forRootAsync({
      imports: [
        UserModule.forRootAsync({
          imports: [HashingModule],
          useClass: UserModuleConfigurationService,
        }),
      ],
      useClass: AuthModuleConfigurationService,
    }),
    ArticleModule.forRootAsync({ useClass: ArticleModuleConfigurationService }),
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: HttpCoreExceptionFilter },
    { provide: APP_GUARD, useClass: RestfulAuthGuard },
  ],
})
export class AppModule {}
