import {
  IPaginationMeta,
  IPaginationParams,
  OrderEnum,
} from '@simple/core/responses';

import { IArticle } from '../interfaces/article.interface';

export type RepositoryListArticlesParams = IPaginationParams<
  {
    publicationDate?: Date;
    author?: string;
  },
  {
    field?: keyof IArticle;
    order?: OrderEnum;
  }
>;

export type RepositoryListArticlesResult = {
  data: IArticle[];
  meta: IPaginationMeta;
};
