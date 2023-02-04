import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import testService from '../../shared/testService';
import { UserEntriesTypes } from './utils/user.validation';

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
      const { body } = response;
      expect(body).toBeDefined();
      expect(body.id).toMatch(UserEntriesTypes.isUUID);
      expect(body.email).toMatch(UserEntriesTypes.isEmail);
      expect(typeof body.name).toBe('string');
      expect(body.image).toMatch(UserEntriesTypes.isURI);
    });
  });
});
