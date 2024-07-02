import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'argonick@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strong_secret', description: 'User password' })
  @IsString()
  password: string;
}

export class SignUpDto {
  @ApiProperty({ example: 'ArgoNick', description: 'User name' })
  username: string;

  @ApiProperty({ example: 'argonick@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strong_secret', description: 'User password' })
  @IsString()
  password: string;
}

export class SignInResponseData {
  @ApiProperty({
    description: 'Access token',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string;

  @ApiProperty({ example: '3600', description: 'Token expiration seconds' })
  expiresIn: number;
}

export class SignUpResponseData {
  @ApiProperty({
    description: 'Access token',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  })
  accessToken: string;

  @ApiProperty({ example: '3600', description: 'Token expiration seconds' })
  expiresIn: number;
}
