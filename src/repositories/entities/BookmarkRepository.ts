import { Bookmark, Prisma } from '@prisma/client';
import { PrismaService } from './../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkRepository extends Repository<
  Bookmark,
  Prisma.BookmarkWhereUniqueInput,
  Prisma.BookmarkWhereInput,
  Prisma.BookmarkOrderByWithRelationInput,
  Prisma.BookmarkCreateInput,
  Prisma.BookmarkUpdateInput
> {
  bookmarkServiceExtension: Prisma.BookmarkDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor(prisma: PrismaService) {
    super(prisma, 'bookmark');
    this.bookmarkServiceExtension = this.prisma.bookmark;
  }
}
