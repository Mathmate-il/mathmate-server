import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './services/auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RepositoriesModule } from './repositories/repositories.module';
import { UserModule } from './services/user/user.module';
import { DevModule } from './dev/dev.module';
import { TagModule } from './services/tag/tag.module';
import { QuestionModule } from './services/question/question.module';

@Module({
  imports: [
    AppConfigModule,
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
  ],
})
export class AppModule {}
