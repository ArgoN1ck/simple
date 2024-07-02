import { Injectable } from '@nestjs/common';
import { HashingService } from '@simple/shared/modules/hashing';

import {
  UserModuleOptions,
  UserModuleOptionsFactory,
} from './configuration.type';

@Injectable()
export class UserModuleConfigurationService
  implements UserModuleOptionsFactory
{
  constructor(private hashingService: HashingService) {}

  async createUserModuleOptions(): Promise<UserModuleOptions> {
    return {
      hashPassword: (password) => this.hashingService.hashPassword(password),
      comparePassword: (password, hash) =>
        this.hashingService.compare(password, hash),
    };
  }
}
