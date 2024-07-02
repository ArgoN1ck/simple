import { faker } from '@faker-js/faker';
import { SignInDto, SignUpDto } from '@simple/sdk/client';

export class AuthFixture {
  static createForSignUp(): SignUpDto {
    return {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password({ length: 16 }),
    };
  }

  static createForSignIn(): SignInDto {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 16 }),
    };
  }
}
