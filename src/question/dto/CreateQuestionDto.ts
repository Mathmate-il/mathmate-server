import { IsString, IsNotEmpty, IsDate } from 'class-validator';
import { TagDto } from 'src/tag/dto/TagDto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  tags: TagDto[];
}
