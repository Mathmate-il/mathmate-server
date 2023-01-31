import { TagDto } from '../../tag/dto/TagDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsNotEmpty()
  @ApiProperty()
  tags: TagDto[];
}
