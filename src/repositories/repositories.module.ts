import { TagRepository } from './entities/TagRepository';
import { AnswerRepository } from './entities/AnswerRepository';
import { QuestionRepository } from './entities/QuestionRepository';
import { UserRepository } from './entities/UserRepository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    UserRepository,
    QuestionRepository,
    AnswerRepository,
    TagRepository,
  ],
  exports: [
    UserRepository,
    QuestionRepository,
    AnswerRepository,
    TagRepository,
  ],
})
export class RepositoriesModule {}
