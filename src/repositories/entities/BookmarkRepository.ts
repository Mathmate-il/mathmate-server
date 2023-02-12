import { Bookmark, Prisma } from '@prisma/client';
import { PrismaService } from './../../prisma/prisma.service';
import { Repository } from '../repository';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateBookMarkDto } from '@/services/bookmark/dto/CreateBookmarkDto';
import { ServerError } from '@/helpers/Errors.enums';

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
  }

  async createBookmark(bookmark: CreateBookMarkDto): Promise<Bookmark> {
    try {
      const newBookmark = await this.prisma.bookmark.create({
        data: {
          user: {
            connect: {
              id: bookmark.userId,
            },
          },
          relatedQuestion: {
            connect: {
              id: bookmark.questionId,
            },
          },
        },
        include: {
          user: true,
          relatedQuestion: true,
        },
      });
      return newBookmark;
    } catch (error) {
      throw new UnprocessableEntityException(ServerError.DatabaseQueryError);
    }
  }
}
