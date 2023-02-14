import { TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import testService from '../../shared/testService';
import * as request from 'supertest';
import { UserEntriesTypes } from '../user/utils/user.validation';

describe('Tag controller', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/tag/all', () => {
    it('Should return all the tags', async () => {
      const response = await request(app.getHttpServer()).get('/tag/all');
      const { body } = response;

      body.forEach((element: any) => {
        expect(element.id).toMatch(UserEntriesTypes.isUUID);
        expect(typeof element.tagName).toBe('string');
      });
    });
  });
});
