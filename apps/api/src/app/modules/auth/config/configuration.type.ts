import { JwtPayload } from '@simple/auth';
import { Result } from '@simple/core/types';
import { Secret } from 'jsonwebtoken';

import { IUserCredentials } from '../interfaces/auth.interface';
import { AuthenticationResult } from '../types/auth.type';

export interface AuthModuleOptions {
  secret: Secret;
  accessTokenExpiresIn: number;
  createUser: (
    email: string,
    username: string,
    password
  ) => Promise<Result<IUserCredentials>>;
  validateUser: (email: string, password) => Promise<Result<IUserCredentials>>;
  generateToken: (payload: JwtPayload) => Promise<Result<AuthenticationResult>>;
}

export interface AuthModuleOptionsFactory {
  createAuthModuleOptions(): AuthModuleOptions | Promise<AuthModuleOptions>;
}
