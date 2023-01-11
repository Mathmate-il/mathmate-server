import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    PrismaModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
  ],
import { AppConfigModule } from './auth/config/config.module';

@Module({
  imports: [AppConfigModule, AuthModule, PrismaModule],
})
export class AppModule {}
