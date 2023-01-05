import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AbstractDto } from './AbstractDto';

export class AuthDto extends AbstractDto {
  constructor(input: AuthDto) {
    super(input);
  }

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
