import { ConfigurableModuleBuilder } from '@nestjs/common';

import { ArticleModuleOptions } from './configuration.type';

const {
  ConfigurableModuleClass: ArticleModuleConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: ARTICLE_MODULE_OPTIONS,
  ASYNC_OPTIONS_TYPE: asyncOptions,
} = new ConfigurableModuleBuilder<ArticleModuleOptions>({
  optionsInjectionToken: 'ARTICLE_MODULE_OPTIONS [INJECTION TOKEN]',
})
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createArticleModuleOptions')
  .setExtras(
    {
      isGlobal: false,
    },
    (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    })
  )
  .build();

type ArticleModuleAsyncOptions = typeof asyncOptions;

export {
  ARTICLE_MODULE_OPTIONS,
  ArticleModuleAsyncOptions,
  ArticleModuleConfigurableModuleClass,
};
