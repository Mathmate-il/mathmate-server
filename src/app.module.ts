<<<<<<< HEAD
<<<<<<< HEAD
=======
import { PrismaModule } from './prisma/prisma.module';
>>>>>>> 7490b52cc812e903ee32e8b4c9e0ffd6777d660e
=======
import { PrismaModule } from './prisma/prisma.module';
>>>>>>> 7490b52cc812e903ee32e8b4c9e0ffd6777d660e
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
