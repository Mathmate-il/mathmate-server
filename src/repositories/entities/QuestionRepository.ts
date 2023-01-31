import { TagErrorMessages } from './../../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from '../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
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

  async createQuestionWithTags(
    question: CreateQuestionDto,
    userId: string,
  ): Promise<Question> {
    const existingTags = await this.prisma.tag.findMany({
      where: {
        id: {
          in: question.tags.map((tag) => tag.id),
        },
      },
    });

    if (existingTags.length !== question.tags.length) {
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
}
