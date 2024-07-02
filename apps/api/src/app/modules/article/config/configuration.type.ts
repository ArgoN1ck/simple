/* eslint-disable @typescript-eslint/no-empty-interface */

export interface ArticleModuleOptions {}

export interface ArticleModuleOptionsFactory {
  createArticleModuleOptions():
    | ArticleModuleOptions
    | Promise<ArticleModuleOptions>;
}
