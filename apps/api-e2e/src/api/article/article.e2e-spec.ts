import { ArticlesApi } from '@simple/sdk/client';
import { randomUUID } from 'crypto';

import { TokenFactory } from '../auth/factories';
import { AuthFixture } from '../auth/fixtures';
import { ArticleFactory } from './factories';
import { ArticleFixture } from './fixtures';

describe('Article', () => {
  const api = new ArticlesApi();

  describe('/api/articles/', () => {
    it('POST', async () => {
      const token = await TokenFactory.createForUser(
        AuthFixture.createForSignUp()
      );
      const articleData = ArticleFixture.create();

      const {
        data: { data, status },
      } = await api.articleControllerCreate(articleData, {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      });

      expect(status).toBe(201);
      expect(data).toBeDefined();
      expect(data).toHaveProperty('authorId');
      expect(data).toHaveProperty('title');
    });

    it('/{id}', async () => {
      const token = await TokenFactory.createForUser(
        AuthFixture.createForSignUp()
      );
      const article = await ArticleFactory.create(
        ArticleFixture.create(),
        token.accessToken
      );

      const {
        data: { data, status },
      } = await api.articleControllerGetArticleById(article.id);

      expect(status).toBe(200);
      expect(data).toBeDefined();
    });

    it('GET', async () => {
      const token = await TokenFactory.createForUser(
        AuthFixture.createForSignUp()
      );

      await ArticleFactory.create(ArticleFixture.create(), token.accessToken);
      await ArticleFactory.create(ArticleFixture.create(), token.accessToken);
      await ArticleFactory.create(ArticleFixture.create(), token.accessToken);
      await ArticleFactory.create(ArticleFixture.create(), token.accessToken);

      const {
        data: { data, status },
      } = await api.articleControllerListArticles();

      expect(status).toBe(200);
      expect(data).toBeDefined();
    });

    it('PUT', async () => {
      const token = await TokenFactory.createForUser(
        AuthFixture.createForSignUp()
      );
      const article = await ArticleFactory.create(
        ArticleFixture.create(),
        token.accessToken
      );

      const {
        data: { data, status },
      } = await api.articleControllerUpdateArticle(
        article.id,
        {
          title: randomUUID(),
        },
        { headers: { Authorization: `Bearer ${token.accessToken}` } }
      );
      expect(status).toBe(200);
      expect(data).toBeDefined();
      expect(data.title === article.title).toBe(false);
    });

    it('DELETE', async () => {
      const token = await TokenFactory.createForUser(
        AuthFixture.createForSignUp()
      );

      const article = await ArticleFactory.create(
        ArticleFixture.create(),
        token.accessToken
      );

      await api.articleControllerDeleteArticle(article.id, {
        headers: { Authorization: `Bearer ${token.accessToken}` },
      });

      const {
        data: { status },
      } = await api
        .articleControllerGetArticleById(article.id)
        .catch((err) => err.response);

      expect(status).toBe(404);
    });
  });
});
