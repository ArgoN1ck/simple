import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@simple/typeorm/entities';

import {
  USER_MODULE_OPTIONS,
  UserModuleAsyncOptions,
  UserModuleConfigurableModuleClass,
} from './config/configuration.module-builder';
import { UserModuleOptions } from './config/configuration.type';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepository, UserService],
  exports: [UserService],
})
export class UserModule extends UserModuleConfigurableModuleClass {
  // static forRoot(options: UserModuleOptions): DynamicModule {
  //   return {
  //     module: UserModule,
  //     imports: [],
  //     providers: [
  //       {
  //         provide: USER_MODULE_OPTIONS,
  //         useValue: options,
  //       },
  //     ],
  //     exports: [],
  //     controllers: [],
  //   };
  // }
  // static forRootAsync(options: UserModuleAsyncOptions): DynamicModule {
  //   const { module, providers, imports } = super.forRootAsync(options);
  //   return {
  //     module,
  //     imports,
  //     providers: [...(providers ? providers : [])],
  //     exports: [],
  //     controllers: [],
  //   };
  // }
}
