import { BookmarkService } from './bookmark.service';
import { Controller } from '@nestjs/common';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
}
