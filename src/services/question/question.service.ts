import { UserRepository } from '../../repositories/entities/UserRepository';
import { ServerError } from '../../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateQuestionDto } from './dto/CreateQuestionDto';
import { QuestionRepository } from '../../repositories/entities/QuestionRepository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Tag } from '@prisma/client';

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

  public async getAllQuestions() {
    try {
      const questions = await this.questionRepository.getAllQuestions();

      if (!questions) {
        throw new NotFoundException(ServerError.NotFound);
      } else {
        return questions;
      }
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }

  public async getAllQuestionsByTags(tags: Tag[]) {
    try {
      const questions = await this.questionRepository.getAllQuestionsByTags(
        tags,
      );

      if (!questions) {
        throw new NotFoundException(ServerError.NotFound);
      } else {
        return questions;
      }
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }

  public async getAllQuestionsByOwner(id: string) {
    try {
      const questions = await this.questionRepository.getAllQuestionsByOwner(
        id,
      );

      if (!questions) {
        throw new NotFoundException(ServerError.NotFound);
      } else {
        return questions;
      }
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }
}
