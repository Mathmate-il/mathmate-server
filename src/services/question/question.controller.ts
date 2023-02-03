import { Question } from '@prisma/client';
import { TagDto } from '../tag/dto/TagDto';
import { JwtGuard } from './../auth/utils/auth.guard';
import { UserDto } from './../user/dto/UserDto';
import { GetUser } from './../auth/utils/getUser.decorator';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { QuestionService } from './question.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async createQuestion(
    @GetUser() user: UserDto,
    @Body() question: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.createQuestion(user.id, question);
  }

  @Get('all')
  async getAllQuestions(): Promise<Question[]> {
    return this.questionService.getAllQuestions();
  }

  @Get('all/filterBy/tags')
  async getAllQuestionsByTags(
    @Body() { tags }: { tags: TagDto[] },
  ): Promise<Question[]> {
    return this.questionService.getAllQuestionsByTags(tags);
  }

  @Get('all/filterBy/owner')
  async getAllQuestionsByOwner(@Body() { id }: { id: string }): Promise<any> {
    return this.questionService.getAllQuestionsByOwner(id);
  }
}
