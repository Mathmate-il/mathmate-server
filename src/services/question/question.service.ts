<<<<<<< HEAD:src/services/question/question.service.ts
import { UserRepository } from '../../repositories/entities/UserRepository';
import { ServerError } from '../../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { QuestionRepository } from '../../repositories/entities/QuestionRepository';
=======
import { UserRepository } from './../repositories/entities/UserRepository';
import { ServerError } from './../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { QuestionRepository } from './../repositories/entities/QuestionRepository';
>>>>>>> main:src/question/question.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async createQuestion(id: string, question: CreateQuestionDto) {
    try {
      const user = await this.userRepository.findOne({ id });

      if (!user) {
        throw new NotFoundException(ServerError.NotFound);
      }
      const createdQuestion = this.questionRepository.createQuestionWithTags(
        question,
        user.id,
      );
      return createdQuestion;
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }
}
