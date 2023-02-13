import {
  BookmarkErrorMessages,
  QuestionErrorMessages,
  ServerError,
  UserErrorMessages,
} from '../../helpers/Errors.enums';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateBookMarkDto } from './dto/CreateBookmarkDto';
import { BookmarkRepository } from '@/repositories/entities/BookmarkRepository';
import { UserRepository } from '@/repositories/entities/UserRepository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { QuestionRepository } from '@/repositories/entities/QuestionRepository';

@Injectable()
export class BookmarkService {
  constructor(
    private readonly bookmarkRepository: BookmarkRepository,
    private readonly userRepository: UserRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  public async create(userId: string, bookmark: CreateBookMarkDto) {
    try {
      const user = await this.userRepository.findOne({ id: userId });
      if (!user) {
        throw new NotFoundException(UserErrorMessages.NotFound);
      }
      const question = this.questionRepository.findOne({
        id: bookmark.questionId,
      });
      if (!question) {
        throw new NotFoundException(QuestionErrorMessages.NotFound);
      }

      const bookmarkExists = await this.bookmarkRepository.findFirst({
        userId: userId,
        questionId: bookmark.questionId,
      });
      if (bookmarkExists) {
        throw new BadRequestException(BookmarkErrorMessages.AlreadyExists);
      }

      const newBookmark = await this.bookmarkRepository.createBookmark(
        userId,
        bookmark,
      );
      return newBookmark;
    } catch (error) {
      throw new BadRequestException(ServerError.BadRequest);
    }
  }
}
