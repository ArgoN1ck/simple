import {
  ArticlesApi,
  CreateArticleDto,
  CreateArticleResponseData,
} from '@simple/sdk/client';

export class ArticleFactory {
  private static api = new ArticlesApi();

  static async create(
    params: CreateArticleDto,
    token: string
  ): Promise<CreateArticleResponseData> {
    const {
      data: { data },
    } = await ArticleFactory.api.articleControllerCreate(params, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data;
  }
}
