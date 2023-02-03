import { INestApplication } from '@nestjs/common';
import { createTestingModule } from './../../shared/createTestModule';
import { TestingModule } from '@nestjs/testing';
import { googleClientCredentials } from './../../shared/auth.google';
import { UnauthorizedError } from './utils/auth.errors';
import * as request from 'supertest';

describe('AuthController & /users/me', () => {
  let app: INestApplication;
  let jwt: string;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();
    app = module.createNestApplication();
    await app.init();
  });

  describe('/auth/login', () => {
    it('should return 401 Unauthorized if authorization header is invalid', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .set('authorization', 'invalid value')
        .expect(401)
        .expect(UnauthorizedError);
    });

    it('should return 201 with JWT token in return', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .set('authorization', googleClientCredentials)
        .expect(201);
      expect(response.body).toEqual({ token: expect.any(String) });
      if (response.body.token) {
        jwt = response.body.token;
      }
    });
  });

  describe('/users/me', () => {
    it('should return 200 with user data', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('authorization', `Bearer ${jwt}`);
      expect(response.body).toBeDefined();
    });
  });
});
