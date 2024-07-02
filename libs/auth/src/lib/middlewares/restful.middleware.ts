import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { get } from 'env-var';
import { NextFunction, Response } from 'express';

import { JwtPayload } from '../types/jwt.payload';

// TODO: Move the auth module to libs
@Injectable()
export class RestfulAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  // TODO: Resolve type error of Request on runtime
  async use(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization as any;
    try {
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
      }
      const [, token] = authHeader.split(' ');

      const user = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: get('JWT_SECRET').required().asString(),
        issuer: get('JWT_ISSUER_URL').required().asUrlString(),
        audience: get('JWT_AUDIENCE_URL').required().asUrlString(),
      });
      req.user = user;

      return next();
    } catch (err) {
      req.user = null;
      return next();
    }
  }
}
