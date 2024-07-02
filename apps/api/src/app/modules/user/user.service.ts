import { Inject } from '@nestjs/common';
import {
  NotFoundException,
  UnauthorizedException,
} from '@simple/core/exceptions';
import { Result } from '@simple/core/types';
import { randomUUID } from 'crypto';

import { USER_MODULE_OPTIONS } from './config/configuration.module-builder';
import { UserModuleOptions } from './config/configuration.type';
import { IUser } from './interfaces/user.interface';
import {
  CreateUserParams,
  GetUserByEmailParams,
  GetUserParams,
} from './types/user.type';
import { UserRepository } from './user.repository';

export class UserService {
  constructor(
    @Inject(USER_MODULE_OPTIONS) private options: UserModuleOptions,
    private readonly userRepository: UserRepository
  ) {}

  async create(params: CreateUserParams): Promise<Result<IUser>> {
    const { email, password, username } = params;

    const createResult = await this.userRepository.create({
      id: randomUUID(),
      email,
      username,
      password: this.options.hashPassword(password),
    });

    return createResult;
  }

  async findOne(params: GetUserParams): Promise<Result<IUser>> {
    const findOneResult = await this.userRepository.findOne(params.id);

    if (findOneResult.isFailure)
      return Result.Failure(
        new NotFoundException(
          'USER_NOT_FOUND',
          `User with id: ${params.id} not found`
        )
      );

    return findOneResult;
  }

  async findOneByEmail(params: GetUserByEmailParams): Promise<Result<IUser>> {
    const findOneResult = await this.userRepository.findOne(params.email);

    if (findOneResult.isFailure)
      return Result.Failure(
        new NotFoundException(
          'USER_NOT_FOUND',
          `User with email: ${params.email} not found`
        )
      );

    return findOneResult;
  }

  async checkPassword(email: string, password: string): Promise<Result<IUser>> {
    const findOneResult = await this.userRepository.findOneByEmail(email);

    if (findOneResult.isFailure)
      return Result.Failure(
        new NotFoundException(
          'USER_NOT_FOUND',
          `User with email: ${email} not found`
        )
      );

    const result = this.options.comparePassword(
      password,
      findOneResult.data.password
    );

    if (!result)
      return Result.Failure(
        new UnauthorizedException(
          'UNAUTHORIZED',
          'UnauthorizedException',
          'Invalid credentials'
        )
      );

    return Result.Success(findOneResult.data);
  }
}
