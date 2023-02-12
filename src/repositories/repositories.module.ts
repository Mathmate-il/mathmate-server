import { TagRepository } from './entities/TagRepository';
import { AnswerRepository } from './entities/AnswerRepository';
import { QuestionRepository } from './entities/QuestionRepository';
import { UserRepository } from './entities/UserRepository';
import { Global, Module } from '@nestjs/common';
import { BookmarkRepository } from './entities/BookmarkRepository';

@Global()
@Module({
  providers: [
    UserRepository,
    QuestionRepository,
    AnswerRepository,
    TagRepository,
    BookmarkRepository,
  ],
  exports: [
    UserRepository,
    QuestionRepository,
    AnswerRepository,
    TagRepository,
    BookmarkRepository,
  ],
})
export class RepositoriesModule {}
