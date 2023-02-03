import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import testService from '../../shared/testService';

describe('UserController', () => {
  let app: INestApplication;
  let jwt: string;

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    await app.init();
  });

  describe('/users/me', () => {
    it('should return 200 with user data', async () => {
      jwt = await testService.getJwtFromGoogleClientCredentials(
        app,
        testService.getGoogleClientCredentials,
      );
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('authorization', `Bearer ${jwt}`);
      expect(response.body).toBeDefined();
    });
  });
});
