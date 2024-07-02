import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RestfulAuthMiddleware } from '@simple/auth';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthModuleConfigurableModuleClass } from './config/configuration.module-builder';

@Module({
  imports: [JwtModule.register({ global: false })],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule
  extends AuthModuleConfigurableModuleClass
  implements NestModule
{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RestfulAuthMiddleware).forRoutes('/');
  }
}
