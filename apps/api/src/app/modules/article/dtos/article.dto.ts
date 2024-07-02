import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { OrderEnum } from '@simple/core/responses';
import { ListDto } from '@simple/core/responses/swagger/dtos';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';

import { IArticle } from '../interfaces/article.interface';

export class GetArticleDto {
  @ApiProperty({
    description: 'Article id',
    default: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsUUID()
  id: string;
}

class ArticleFilterDto {
  @ApiPropertyOptional({
    example: 'ArgoNick',
    description: 'Article author username',
  })
  author: string;

  @ApiPropertyOptional({
    example: '2024-03-29 10:21:02.810132',
    description: 'Article publication date',
  })
  publicationDate: Date;
}

class ArticleOrderByDto {
  @ApiPropertyOptional({
    description: 'Field to order by',
    enum: ['publicationDate', 'title'],
  })
  @IsOptional()
  @IsEnum(['publicationDate', 'title'])
  orderBy?: 'publicationDate' | 'title';

  @ApiPropertyOptional({
    description: 'Order direction',
    enum: OrderEnum,
    enumName: 'OrderEnum',
  })
  @IsOptional()
  @IsEnum(OrderEnum)
  order?: OrderEnum;
}

export class ListArticlesDto extends ListDto({
  filterRef: ArticleFilterDto,
  orderByRef: ArticleOrderByDto,
}) {}

export class CreateArticleDto {
  @ApiProperty({
    example: 'Simple news',
    description: 'Article title',
  })
  title: string;

  @ApiProperty({
    example: '<h1>SIMPLE NEWS</h1>',
    description: 'Article description',
  })
  description: string;
}

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class Article implements IArticle {
  @ApiProperty({
    description: 'Article id',
    default: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  id: string;

  @ApiProperty({
    example: 'Simple news',
    description: 'Article title',
  })
  title: string;

  @ApiProperty({
    example: '<h1>SIMPLE NEWS</h1>',
    description: 'Article description',
  })
  description: string;

  @ApiProperty({
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    description: 'Article author id',
  })
  authorId: string;

  @ApiProperty({
    example: '2024-03-29 10:21:02.810132',
    description: 'Article publication date',
  })
  publicationDate: Date;

  @ApiProperty({
    example: '2024-03-29 10:21:02.810132',
    description: 'Article created date',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-03-29 10:21:02.810132',
    description: 'Article updated date',
  })
  updatedAt: Date;
}

export class GetArticleResponseData extends Article {}
export class ListArticlesResponseData extends Article {}
export class CreateArticleResponseData extends Article {}
export class UpdateArticleResponseData extends Article {}
