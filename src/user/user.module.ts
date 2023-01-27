import { PrismaService } from './../prisma/prisma.service';
import { UserRepository } from './../repositories/entities/UserRepository';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [UserRepository, PrismaService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
