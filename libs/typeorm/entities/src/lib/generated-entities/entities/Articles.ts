import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Users } from './Users';

@Index('idx_articles_author_id', ['authorId'], {})
@Index('articles_pkey', ['id'], { unique: true })
@Index('idx_articles_publication_date', ['publicationDate'], {})
@Entity('articles', { schema: 'public' })
export class Articles {
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

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date | null;

  @ManyToOne(() => Users, (users) => users.articles)
  @JoinColumn([{ name: 'author_id', referencedColumnName: 'id' }])
  author: Users;
}
