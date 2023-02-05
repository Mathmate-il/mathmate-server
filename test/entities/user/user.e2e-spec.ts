import { UserInvalidJwtError } from './utils/user.errors';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import testService from '../../shared/testService';
import { UserEntriesTypes } from './utils/user.validation';
import {
  validUpdateUserDto,
  invalidUpdateUserDto,
  invalidUpdateUserDtoWithCreatedAt,
  invalidUpdateUserDtoWithId,
} from './utils/user.cases';

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
      expect(200);
      expect(body).toBeDefined();
      expect(typeof body.name).toBe('string');
      expect(body.id).toMatch(UserEntriesTypes.isUUID);
      expect(body.email).toMatch(UserEntriesTypes.isEmail);
      expect(body.image).toMatch(UserEntriesTypes.isURI);
    });

    it('should return 200 with the updated user information in res.body', async () => {
      return await request(app.getHttpServer())
        .patch('/users/me/update')
        .set('authorization', `Bearer ${jwt}`)
        .send(validUpdateUserDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(validUpdateUserDto.name);
          expect(res.body.image).toBe(validUpdateUserDto.image);
        });
    });

    it('should return 401 Unauthorized error when the authorization header is invalid', async () => {
      const invalidJwt = 'invalid_jwt';
      const response = await request(app.getHttpServer())
        .get('/users/me')
        .set('authorization', `Bearer ${invalidJwt}`);
      expect(response.status).toEqual(401);
      expect(response.body).toEqual(UserInvalidJwtError);
    });
  });
});
