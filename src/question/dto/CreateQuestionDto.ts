import { IsString, IsNotEmpty } from 'class-validator';
import { TagDto } from 'src/tag/dto/TagDto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  tags: TagDto[];
}
