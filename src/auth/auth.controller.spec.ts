import { unauthorizedResponse } from './utils/auth.test.responses';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../DAL/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';

describe('AuthController', () => {
  let app: INestApplication;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
      providers: [AuthService, PrismaService, AppConfigService, JwtService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Google and JWT authentication', () => {
    it('should return 401 with Unauthorized message for /auth/signup ', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({ oAuthToken: 'some random value' })
        .expect(401)
        .expect(unauthorizedResponse);
    });
  });
});
