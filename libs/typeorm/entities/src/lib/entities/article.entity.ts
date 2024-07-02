import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { Articles } from '../generated-entities/entities/Articles';
import { UserEntity } from './user.entity';

@Index('idx_articles_author_id', ['authorId'], {})
@Index('articles_pkey', ['id'], { unique: true })
@Index('idx_articles_publication_date', ['publicationDate'], {})
@Entity('articles', { schema: 'public' })
export class ArticleEntity implements Articles {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'title', length: 255 })
  title: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamp without time zone', { name: 'publication_date' })
  publicationDate: Date;

  @Column('uuid', { name: 'author_id', nullable: true })
  authorId: string | null;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
  author: UserEntity;
}
