import { QuestionDto } from '../../question/dto/QuestionDto';
import { PrismaService } from '../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';
import { TagDto } from 'src/tag/dto/TagDto';

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
    question: QuestionDto,
    tags: TagDto[],
  ): Promise<Question> {
    return this.prisma.question.create({
      data: {
        ...question,
        tags: {
          create: {
            ...tags,
          },
        },
      },
    });
  }
}
