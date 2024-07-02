import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { REQUIRE_AUTH_KEY } from '../decorators';

@Injectable()
export class RestfulAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const isPrivate =
      this.reflector.getAllAndOverride(REQUIRE_AUTH_KEY, [
        context.getHandler(),
        context.getHandler(),
      ]) || false;

    if (!isPrivate) {
      return true;
    }

    const { user } = request;

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
