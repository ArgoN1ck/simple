import { Injectable } from '@nestjs/common';

import {
  ArticleModuleOptions,
  ArticleModuleOptionsFactory,
} from './configuration.type';

@Injectable()
export class ArticleModuleConfigurationService
  implements ArticleModuleOptionsFactory
{
  async createArticleModuleOptions(): Promise<ArticleModuleOptions> {
    return {};
  }
}
