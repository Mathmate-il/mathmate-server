import { JwtGuard } from './../auth/utils/auth.guard';
import { Question, Tag } from '@prisma/client';
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

  @Get('get-all')
  @UseGuards(JwtGuard)
  async getAllQuestions(@GetUser() user: UserDto): Promise<Question[]> {
    return this.questionService.getAllQuestions(user.id);
  }

  @Get('get-all-by-tags')
  @UseGuards(JwtGuard)
  async getAllQuestionsByTags(
    @GetUser() user: UserDto,
    @Body() tags: Tag[],
  ): Promise<Question[]> {
    return this.questionService.getAllQuestionsByTags(user.id, tags);
  }

  @Get('get-all-by-owner')
  @UseGuards(JwtGuard)
  async getAllQuestionsByOwner(@GetUser() user: UserDto): Promise<Question[]> {
    return this.questionService.getAllQuestionsByOwner(user.id);
  }
}
