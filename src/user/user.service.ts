import { ServerError } from './../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserRepository } from './../repositories/entities/UserRepository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { QuestionRepository } from 'src/repositories/entities/QuestionRepository';
import { CreateQuestionDto } from 'src/question/dto/CreateQuestionDto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  public async updateUser(id: string, body: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ id });
      if (!user) {
        throw new NotFoundException(ServerError.NotFound);
      }

      const updatedUser = await this.userRepository.update({
        where: { id },
        data: body,
      });
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }

  public async createQuestion(id: string, body: CreateQuestionDto) {
    try {
      const user = await this.userRepository.findOne({ id });

      if (!user) {
        throw new NotFoundException(ServerError.NotFound);
      }

      const createdQuestion = this.questionRepository.createQuestionWithTags(
        body,
        user.id,
      );

      return createdQuestion;
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }
}
