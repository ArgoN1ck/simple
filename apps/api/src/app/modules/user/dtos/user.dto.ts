import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ArgoNick', description: 'User name' })
  username: string;

  @ApiProperty({ example: 'argonick@gmail.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strong_secret', description: 'User password' })
  @IsString()
  password: string;
}

export class GetUserDto {
  @ApiProperty({
    description: 'User id',
    default: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  })
  @IsUUID('4')
  id: string;
}
