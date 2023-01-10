import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './auth/config/config.module';

@Module({
  imports: [AppConfigModule, AuthModule, PrismaModule],
})
export class AppModule {}
