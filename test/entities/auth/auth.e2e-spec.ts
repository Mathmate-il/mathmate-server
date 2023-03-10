import testService from '../../shared/testService';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { UnauthorizedError } from './utils/auth.errors';
import * as request from 'supertest';

describe('AuthController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/auth/login', () => {
    it('should return 401 Unauthorized if authorization header is invalid', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('authorization', 'invalid value')
        .expect(401)
        .expect((res) => {
          expect(res.body).toEqual(UnauthorizedError);
        });
    });

    it('should return 201 with JWT token in return', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('authorization', testService.getGoogleClientCredentials)
        .expect(201);
      expect(response.body).toEqual({ token: expect.any(String) });
    });
  });
});
