import { Inject, Injectable } from '@nestjs/common';
import {
  ConflictException,
  InternalServerException,
  UnauthorizedException,
} from '@simple/core/exceptions';
import { Result } from '@simple/core/types';

import { AUTH_MODULE_OPTIONS } from './config/configuration.module-builder';
import { AuthModuleOptions } from './config/configuration.type';
import {
  AuthenticationResult,
  SignInParams,
  SignUpParams,
} from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_MODULE_OPTIONS) private options: AuthModuleOptions
  ) {}

  async signUp(params: SignUpParams): Promise<Result<AuthenticationResult>> {
    const { email, username, password } = params;

    const createUserResult = await this.options.createUser(
      email,
      username,
      password
    );

    if (createUserResult.isFailure)
      return Result.Failure(
        new ConflictException(
          'USER_ALREADY_EXISTS',
          'ConflictException',
          'Such user already exists'
        )
      );

    const generateTokenResult = await this.options.generateToken({
      sub: createUserResult.data.id,
      email,
      username,
    });

    if (generateTokenResult.isFailure)
      return Result.Failure(
        new InternalServerException(
          'INTERNAL_ERROR',
          'InternalServerException',
          'Something went wrong'
        )
      );

    return generateTokenResult;
  }
  async signIn(params: SignInParams): Promise<Result<AuthenticationResult>> {
    const { email, password } = params;

    const getUserResult = await this.options.validateUser(email, password);

    if (getUserResult.isFailure) {
      return Result.Failure(
        new UnauthorizedException(
          'UNAUTHORIZED',
          'UnauthorizedException',
          'Invalid credentials'
        )
      );
    }

    const generateTokenResult = await this.options.generateToken({
      sub: getUserResult.data.id,
      email,
      username: getUserResult.data.username,
    });

    if (generateTokenResult.isFailure)
      return Result.Failure(
        new InternalServerException(
          'INTERNAL_ERROR',
          'InternalServerException',
          'Something went wrong'
        )
      );

    return generateTokenResult;
  }
}
