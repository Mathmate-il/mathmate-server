import { PrismaService } from './../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswerRepository extends Repository<
  Answer,
  Prisma.AnswerWhereUniqueInput,
  Prisma.AnswerWhereInput,
  Prisma.AnswerOrderByWithRelationInput,
  Prisma.AnswerCreateInput,
  Prisma.AnswerUpdateInput
> {
  answerServiceExtension: Prisma.AnswerDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor(prisma: PrismaService) {
    super(prisma, 'answer');
    this.answerServiceExtension = this.prisma.answer;
  }
}
