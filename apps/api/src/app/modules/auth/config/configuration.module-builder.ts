import { ConfigurableModuleBuilder } from '@nestjs/common';

import { AuthModuleOptions } from './configuration.type';

const {
  ConfigurableModuleClass: AuthModuleConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: AUTH_MODULE_OPTIONS,
  ASYNC_OPTIONS_TYPE: asyncOptions,
} = new ConfigurableModuleBuilder<AuthModuleOptions>({
  optionsInjectionToken: 'AUTH_MODULE_OPTIONS [INJECTION TOKEN]',
})
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createAuthModuleOptions')
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

type AuthModuleAsyncOptions = typeof asyncOptions;

export {
  AUTH_MODULE_OPTIONS,
  AuthModuleAsyncOptions,
  AuthModuleConfigurableModuleClass,
};
