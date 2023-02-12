import { BookmarkRepository } from '@/repositories/entities/BookmarkRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService {
  constructor(private readonly bookmarkRepository: BookmarkRepository) {}
}
