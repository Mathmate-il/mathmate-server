import { AppController } from './app.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RepositoriesModule } from './repositories/repositories.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    PrismaModule,
    RepositoriesModule,
    JwtModule.register({}),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
