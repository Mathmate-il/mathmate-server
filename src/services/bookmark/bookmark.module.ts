import { Module } from '@nestjs/common';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

@Module({
  providers: [BookmarkService],
  controllers: [BookmarkController],
})
export class BookmarkModule {}
