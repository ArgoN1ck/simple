import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@simple/core/responses/swagger/decorators';
import { ResponseDto } from '@simple/core/responses/swagger/dtos';

import { AuthService } from './auth.service';
import {
  SignInDto,
  SignInResponseData,
  SignUpDto,
  SignUpResponseData,
} from './dtos/auth.dto';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in', operationId: 'signIn' })
  @ApiResponse(SignInResponseData, {
    title: 'SignInResponse',
    status: HttpStatus.CREATED,
  })
  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    const signInResult = await this.authService.signIn(dto);

    if (signInResult.isFailure) signInResult.toProblemDetails();

    return new ResponseDto({
      dto: SignInResponseData,
      data: signInResult.data,
      status: HttpStatus.CREATED,
    });
  }

  @ApiOperation({ summary: 'Sign up', operationId: 'signUp' })
  @ApiResponse(SignUpResponseData, {
    title: 'SignUpResponse',
    status: HttpStatus.CREATED,
  })
  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    const signUpResult = await this.authService.signUp(dto);

    if (signUpResult.isFailure) signUpResult.toProblemDetails();

    return new ResponseDto({
      dto: SignUpResponseData,
      data: signUpResult.data,
      status: HttpStatus.CREATED,
    });
  }
}
