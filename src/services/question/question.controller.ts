import { JwtGuard } from './../auth/utils/auth.guard';
import { Question } from '@prisma/client';
import { UserDto } from './../user/dto/UserDto';
import { GetUser } from './../auth/utils/getUser.decorator';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { QuestionService } from './question.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

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
}
