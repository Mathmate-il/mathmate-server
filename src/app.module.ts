import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RepositoriesModule } from './repositories/repositories.module';
import { UserModule } from './services/user/user.module';
import { DevModule } from './dev/dev.module';
import { TagModule } from './services/tag/tag.module';
import { QuestionModule } from './services/question/question.module';
import { APP_FILTER } from '@nestjs/core';
import { DatabaseSeeder } from './database/seeder';
import { AnswerModule } from './services/answer/answer.module';
import { BookmarkModule } from './services/bookmark/bookmark.module';
import { AppLoggerModule } from './logger/logger.module';

@Module({
  imports: [
    AppLoggerModule,
    AuthModule,
    PrismaModule,
    RepositoriesModule,
    DevModule,
    JwtModule.register({}),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    UserModule,
    TagModule,
    QuestionModule,
    AnswerModule,
    BookmarkModule,
  ],
  providers: [DatabaseSeeder],
})
export class AppModule {}
