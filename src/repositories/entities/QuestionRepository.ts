import { PrismaService } from '../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import { Prisma, Question } from '@prisma/client';

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
}
