import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictException } from '@simple/core/exceptions';
import { Result } from '@simple/core/types';
import { UserEntity } from '@simple/typeorm/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(params: Partial<UserEntity>): Promise<Result<UserEntity>> {
    try {
      const user = this.userRepository.create({
        ...params,
      });
      await this.userRepository.save(user);

      return Result.Success(user);
    } catch (err) {
      return Result.Failure(
        new ConflictException(
          'USER_EXISTS',
          'ConflictException',
          'User already exists'
        )
      );
    }
  }

  async findOne(id: string): Promise<Result<UserEntity>> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return Result.Failure(null);

    return Result.Success(user);
  }

  async findOneByEmail(email: string): Promise<Result<UserEntity>> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) return Result.Failure(null);

    return Result.Success(user);
  }
}
