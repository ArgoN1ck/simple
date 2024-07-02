import { RedisClientModule } from '@argotools/redis-client';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@simple/typeorm/entities';

import { ArticleController } from './article.controller';
import { ArticleRedisEntity } from './article.redis-entity';
import { ArticleRepository } from './article.repository';
import { ArticleService } from './article.service';
import { ArticleModuleConfigurableModuleClass } from './config/configuration.module-builder';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    RedisClientModule.forFeature([ArticleRedisEntity]),
  ],
  providers: [ArticleRepository, ArticleService],
  exports: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule extends ArticleModuleConfigurableModuleClass {}
