import { AppConfigModule } from './../config/config.module';
import { PrismaService } from './../prisma/prisma.service';
import { UserRepository } from './../repositories/entities/UserRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      controllers: [UserController],
      providers: [UserService, UserRepository, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
