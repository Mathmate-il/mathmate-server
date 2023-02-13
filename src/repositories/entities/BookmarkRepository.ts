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

  async createBookmark(
    userId: string,
    bookmark: CreateBookMarkDto,
  ): Promise<Bookmark> {
    try {
      const newBookmark = await this.prisma.bookmark.create({
        data: {
          owner: {
            connect: {
              id: userId,
            },
          },
          relatedQuestion: {
            connect: {
              id: bookmark.questionId,
            },
          },
        },
        include: {
          relatedQuestion: true,
          owner: true,
        },
      });
      return newBookmark;
    } catch (error) {
      throw new UnprocessableEntityException(ServerError.DatabaseQueryError);
    }
  }
}
