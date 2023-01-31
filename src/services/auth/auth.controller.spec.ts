import { PrismaService } from './../prisma/prisma.service';
import { UserRepository } from './../repositories/entities/UserRepository';
import { unauthorizedResponse } from './utils/auth.test.responses';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConfigModule } from '../config/config.module';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      providers: [AuthService, UserRepository, JwtService, PrismaService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    app = module.createNestApplication();
    app.listen(80, () => {
      console.log('Server listening on port 80');
    });
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Google and JWT authentication', () => {
    it('should return 401 with Unauthorized message for /auth/signup ', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ oAuthToken: 'some random value' })
        .expect(401)
        .expect(unauthorizedResponse);
    });
  });
});
