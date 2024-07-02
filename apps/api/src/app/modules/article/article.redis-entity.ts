import { PrimaryKey, RedisEntity } from '@argotools/redis-client';

@RedisEntity({
  keyPrefix: 'article',
  ttlMilliseconds: 15 * 60,
})
export class ArticleRedisEntity {
  @PrimaryKey()
  id: string;
  title: string;
  description: string;
  publicationDate: Date;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
