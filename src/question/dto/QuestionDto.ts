import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class QuestionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
