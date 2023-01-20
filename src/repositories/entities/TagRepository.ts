import { PrismaService } from '../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';

@Injectable()
export class TagRepository extends Repository<
  Tag,
  Prisma.TagWhereUniqueInput,
  Prisma.TagWhereInput,
  Prisma.TagOrderByWithRelationInput,
  Prisma.TagCreateInput,
  Prisma.TagUpdateInput
> {
  tagServiceExtension: Prisma.TagDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor(prisma: PrismaService) {
    super(prisma, 'tag');
    this.tagServiceExtension = this.prisma.tag;
  }
}
