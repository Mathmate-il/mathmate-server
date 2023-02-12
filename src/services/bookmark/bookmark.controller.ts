import { BookmarkService } from './bookmark.service';
import { Body, Controller, Post } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { CreateBookMarkDto } from './dto/CreateBookmarkDto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('create')
  async create(@Body() bookmark: CreateBookMarkDto): Promise<Bookmark> {
    return this.bookmarkService.create(bookmark);
  }
}
