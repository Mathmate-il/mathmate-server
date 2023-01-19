import { PrismaService } from '../../prisma/prisma.service';
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
  constructor(prisma: PrismaService) {
    super(prisma, 'answer');
  }
}
