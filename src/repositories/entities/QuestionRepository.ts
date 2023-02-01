import { TagErrorMessages, ServerError } from './../../helpers/Errors.enums';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common/exceptions';
import { PrismaService } from '../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import { Prisma, Question, Tag } from '@prisma/client';
import { CreateQuestionDto } from '../../services/question/dto/CreateQuestionDto';

@Injectable()
export class QuestionRepository extends Repository<
  Question,
  Prisma.QuestionWhereUniqueInput,
  Prisma.QuestionWhereInput,
  Prisma.QuestionOrderByWithRelationInput,
  Prisma.QuestionCreateInput,
  Prisma.QuestionUpdateInput
> {
  questionServiceExtension: Prisma.QuestionDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor(prisma: PrismaService) {
    super(prisma, 'question');
    this.questionServiceExtension = this.prisma.question;
  }

  public async createQuestionWithTags(
    question: CreateQuestionDto,
    userId: string,
  ): Promise<Question> {
    const isTagValid = await this.checkIfTagsAreValid(question);
    if (!isTagValid) {
      throw new NotFoundException(TagErrorMessages.NotFound);
    }
    return this.prisma.question.create({
      data: {
        ...question,
        tags: {
          connect: [...question.tags],
        },
        owner: {
          connect: {
            id: userId,
          },
        },
      },
      include: { tags: true },
    });
  }

  public async getAllQuestionsByTags(tags: Tag[]): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      where: {
        tags: { some: { id: { in: tags.map((tag) => tag.id) } } },
      },
    });

    return questions;
  }

  private async checkIfTagsAreValid(question: CreateQuestionDto) {
    try {
      const existingTags = await this.prisma.tag.findMany({
        where: {
          id: {
            in: question.tags.map((tag) => tag.id),
          },
        },
      });
      if (existingTags.length !== question.tags.length) {
        return null;
      }
      return existingTags;
    } catch (error) {
      throw new UnprocessableEntityException(ServerError.DatabaseQueryError);
    }
  }
}
