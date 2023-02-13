import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookMarkDto {
  @IsNotEmpty()
  @IsUUID()
  questionId: string;
}
