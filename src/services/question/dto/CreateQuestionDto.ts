import { TagDto } from '../../tag/dto/TagDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsNotEmpty()
  @ApiProperty()
  tags: TagDto[];
}
