import { InjectRedisRepository, Repository } from '@argotools/redis-client';
import { Injectable } from '@nestjs/common';
import { ForbiddenException, NotFoundException } from '@simple/core/exceptions';
import { Result } from '@simple/core/types';
import { ArticleEntity } from '@simple/typeorm/entities';
import { randomUUID } from 'crypto';

import { ArticleRedisEntity } from './article.redis-entity';
import { ArticleRepository } from './article.repository';
import {
  CreateArticleParams,
  ListArticlesParams,
  ListArticlesResult,
  UpdateArticleParams,
} from './types/article.type';
@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    @InjectRedisRepository(ArticleRedisEntity)
    private readonly articleRedisRepository: Repository<ArticleRedisEntity>
  ) {}

  async createArticle(
    params: CreateArticleParams
  ): Promise<Result<ArticleEntity>> {
    const articleData: Partial<ArticleEntity> = {
      id: randomUUID(),
      ...params,
    };

    return this.articleRepository.createArticle(articleData);
  }

  async getArticleById(
    id: string
  ): Promise<Result<ArticleEntity | ArticleRedisEntity>> {
    const articleFromCache = await this.articleRedisRepository.get({ id });

    if (articleFromCache) {
      return Result.Success(articleFromCache);
    }

    const articleResult = await this.articleRepository.getArticleById(id);

    if (articleResult.isFailure) return articleResult;

    await this.articleRedisRepository.set(articleResult.data);

    return articleResult;
  }

  async listArticles(
    params: ListArticlesParams
  ): Promise<Result<ListArticlesResult>> {
    return this.articleRepository.listArticles(params);
  }

  async updateArticle(
    id: string,
    params: UpdateArticleParams,
    authorId: string
  ): Promise<Result<ArticleEntity>> {
    const updateData: Partial<ArticleEntity> = {
      ...params,
      updatedAt: new Date(),
    };

    const result = await this.articleRepository.updateArticle(id, updateData);
    if (result.isFailure) return result;

    if (result.data.authorId !== authorId)
      return Result.Failure(
        new ForbiddenException(
          'FORBIDDEN',
          'ForbiddenException',
          'User has no permissions'
        )
      );

    await this.articleRedisRepository.set(result.data);
    return result;
  }

  async deleteArticle(id: string, authorId: string): Promise<Result<null>> {
    const articleResult = await this.articleRepository.getArticleById(id);

    if (articleResult.isFailure)
      return Result.Failure(
        new NotFoundException('ARTICLE_NOT_FOUND', 'NotFoundException')
      );

    if (articleResult.data.authorId !== authorId)
      return Result.Failure(
        new ForbiddenException(
          'FORBIDDEN',
          'ForbiddenException',
          'User has no permissions'
        )
      );

    const result = await this.articleRepository.deleteArticle(id);

    if (result.isFailure) return result;

    await this.articleRedisRepository.delete({ id });

    return result;
  }
}
