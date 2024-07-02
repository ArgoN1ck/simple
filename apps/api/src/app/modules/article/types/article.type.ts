import {
  IPaginationMeta,
  IPaginationParams,
  OrderEnum,
} from '@simple/core/responses';

import { IArticle } from '../interfaces/article.interface';

export type ListArticlesParams = IPaginationParams<
  {
    publicationDate?: Date;
    username?: string;
  },
  {
    field?: keyof IArticle;
    order?: OrderEnum;
  }
>;

export type GetArticleParams = {
  id: string;
};

export type CreateArticleParams = {
  title: string;
  description: string;
  authorId: string;
};

export type UpdateArticleParams = Partial<IArticle>;

export type ListArticlesResult = {
  data: IArticle[];
  meta: IPaginationMeta;
};

export type GetArticleResult = IArticle | null;
export type CreateArticleResult = {
  id: string;
};
