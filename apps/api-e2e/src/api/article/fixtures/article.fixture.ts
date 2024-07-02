import { faker } from '@faker-js/faker';
import { CreateArticleDto } from '@simple/sdk/client';

export class ArticleFixture {
  static create(): CreateArticleDto {
    return {
      title: faker.string.uuid(),
      description: faker.string.uuid(),
    };
  }
}
