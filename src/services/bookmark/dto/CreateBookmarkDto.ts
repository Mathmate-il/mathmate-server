import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookMarkDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  questionId: string;
}
