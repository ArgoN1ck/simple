import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtPayload, RequireAuth, User } from '@simple/auth';
import {
  ApiEmptyResponse,
  ApiPaginatedResponse,
  ApiResponse,
} from '@simple/core/responses/swagger/decorators';
import {
  PaginatedResponseDto,
  ResponseDto,
} from '@simple/core/responses/swagger/dtos';

import { ArticleService } from './article.service';
import {
  CreateArticleDto,
  CreateArticleResponseData,
  GetArticleResponseData,
  ListArticlesDto,
  ListArticlesResponseData,
  UpdateArticleDto,
  UpdateArticleResponseData,
} from './dtos/article.dto';

@ApiTags('Articles')
@ApiBearerAuth()
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @RequireAuth()
  @ApiResponse(CreateArticleResponseData, {
    title: 'CreateArticleResponse',
    status: HttpStatus.CREATED,
  })
  async create(@Body() dto: CreateArticleDto, @User() user: JwtPayload) {
    const result = await this.articleService.createArticle({
      ...dto,
      authorId: user.sub,
    });

    if (result.isFailure) result.toProblemDetails();

    return new ResponseDto({
      dto: CreateArticleDto,
      data: result.data,
      status: HttpStatus.CREATED,
    });
  }

  @Get(':id')
  @ApiResponse(GetArticleResponseData, {
    title: 'GetArticleResponse',
  })
  async getArticleById(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.articleService.getArticleById(id);

    if (result.isFailure) result.toProblemDetails();

    return new ResponseDto({
      dto: GetArticleResponseData,
      data: result.data,
    });
  }

  @Get()
  @ApiPaginatedResponse(ListArticlesResponseData, {
    title: 'ListArticlesResponse',
  })
  async listArticles(@Query() dto: ListArticlesDto) {
    const { curPage, orderBy, order, perPage, ...filter } = dto;

    const listResult = await this.articleService.listArticles({
      curPage,
      filter,
      orderBy: orderBy && order ? { field: orderBy, order } : undefined,
      perPage,
    });

    return new PaginatedResponseDto({
      dto: ListArticlesResponseData,
      data: listResult.data.data,
      meta: listResult.data.meta,
    });
  }

  @Put(':id')
  @RequireAuth()
  @ApiResponse(UpdateArticleResponseData, {
    title: 'UpdateArticleResponse',
  })
  async updateArticle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @User() user: JwtPayload
  ) {
    const result = await this.articleService.updateArticle(
      id,
      updateArticleDto,
      user.sub
    );

    if (result.isFailure) result.toProblemDetails();

    return new ResponseDto({
      dto: CreateArticleDto,
      data: result.data,
    });
  }

  @Delete(':id')
  @RequireAuth()
  @ApiEmptyResponse({
    title: 'DeleteArticleResponse',
  })
  async deleteArticle(
    @Param('id', ParseUUIDPipe) id: string,
    @User() user: JwtPayload
  ) {
    const result = await this.articleService.deleteArticle(id, user.sub);

    if (result.isFailure) result.toProblemDetails();

    return new ResponseDto({
      dto: null,
      data: null,
    });
  }
}
