import { IsString, IsDate, IsNotEmpty, IsEmail, IsUUID } from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  name: string;
}
