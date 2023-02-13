import { JwtGuard } from './../auth/utils/auth.guard';
import { BookmarkService } from './bookmark.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Bookmark, User } from '@prisma/client';
import { CreateBookMarkDto } from './dto/CreateBookmarkDto';
import { GetUser } from '../auth/utils/getUser.decorator';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async create(
    @GetUser() user: User,
    @Body() bookmark: CreateBookMarkDto,
  ): Promise<Bookmark> {
    return this.bookmarkService.create(user.id, bookmark);
  }
}
