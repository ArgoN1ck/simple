import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException, NotFoundException } from '@simple/core/exceptions';
import { Result } from '@simple/core/types';
import { parseMetaArgs } from '@simple/core/utils';
import { ArticleEntity } from '@simple/typeorm/entities';
import { Repository } from 'typeorm';

import {
  RepositoryListArticlesParams,
  RepositoryListArticlesResult,
} from './types/article-repository.type';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  async createArticle(
    params: Partial<ArticleEntity>
  ): Promise<Result<ArticleEntity>> {
    try {
      const article = this.articleRepository.create(params);
      await this.articleRepository.save(article);
      return Result.Success(article);
    } catch (error) {
      return Result.Failure(
        new ConflictException(
          'CREATE_FAILED',
          'Failed to create the article',
          error.message
        )
      );
    }
  }

  async getArticleById(id: string): Promise<Result<ArticleEntity>> {
    const article = await this.articleRepository.findOne({ where: { id } });
    if (!article) {
      return Result.Failure(
        new NotFoundException(
          'NOT_FOUND',
          'Article not found',
          `Article with ID ${id} does not exist`
        )
      );
    }
    return Result.Success(article);
  }

  async listArticles(
    params: RepositoryListArticlesParams
  ): Promise<Result<RepositoryListArticlesResult>> {
    const { filter, orderBy } = params;

    const { skip, take, curPage, perPage } = parseMetaArgs({
      curPage: params.curPage,
      perPage: params.perPage,
    });

    const order = {};

    if (orderBy && orderBy.field) {
      order[orderBy.field] = { direction: orderBy.order };
    }

    const [raws, total] = await this.articleRepository.findAndCount({
      where: {
        publicationDate: filter?.publicationDate,
        author: { username: filter?.author },
      },
      order,
      skip,
      take,
    });

    return Result.Success({ data: raws, meta: { curPage, perPage, total } });
  }

  async updateArticle(
    id: string,
    updateData: Partial<ArticleEntity>
  ): Promise<Result<ArticleEntity>> {
    try {
      await this.articleRepository.update(id, updateData);
      const updatedArticle = await this.articleRepository.findOne({
        where: { id },
      });
      if (!updatedArticle) {
        return Result.Failure(
          new NotFoundException(
            'NOT_FOUND',
            'Article not found',
            `Article with ID ${id} does not exist`
          )
        );
      }
      return Result.Success(updatedArticle);
    } catch (error) {
      return Result.Failure(
        new ConflictException(
          'CREATE_FAILED',
          'Failed to create the article',
          error.message
        )
      );
    }
  }

  async deleteArticle(id: string): Promise<Result<null>> {
    const deleteResult = await this.articleRepository.delete(id);
    if (deleteResult.affected === 0) {
      return Result.Failure(
        new NotFoundException(
          'NOT_FOUND',
          'Article not found',
          `Article with ID ${id} does not exist`
        )
      );
    }
    return Result.Success(null);
  }
}
