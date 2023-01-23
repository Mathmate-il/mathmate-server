import { IsString, IsNotEmpty } from 'class-validator';

export class TagDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  tagName: string;
}
