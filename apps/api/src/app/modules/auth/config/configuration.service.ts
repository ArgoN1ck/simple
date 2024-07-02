import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@simple/auth';
import { Result } from '@simple/core/types';
import { environment } from 'apps/api/src/environment/environment';

import { UserService } from '../../user/user.service';
import {
  AuthModuleOptions,
  AuthModuleOptionsFactory,
} from './configuration.type';

@Injectable()
export class AuthModuleConfigurationService
  implements AuthModuleOptionsFactory
{
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async createAuthModuleOptions(): Promise<AuthModuleOptions> {
    return {
      secret: environment.auth.secret,
      accessTokenExpiresIn: environment.auth.accessTokenExpiresIn,
      createUser: async (email, username, password) =>
        await this.userService.create({ email, password, username }),
      validateUser: async (email, password) =>
        await this.userService.checkPassword(email, password),
      generateToken: async (payload: JwtPayload) => {
        const expiresIn = environment.auth.accessTokenExpiresIn;
        const accessToken = await this.jwtService.signAsync(payload, {
          secret: environment.auth.secret,
          issuer: environment.auth.issuerUrl,
          audience: environment.auth.audienceUrl,
          expiresIn,
        });

        return Result.Success({ accessToken, expiresIn });
      },
    };
  }
}
