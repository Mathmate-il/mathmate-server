import { BookmarkInvalidQuestionIdError } from './utils/errors';
import testService from '../../shared/testService';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Question, Tag } from '@prisma/client';

describe('BookmarkController', () => {
  let app: INestApplication;
  let jwt: string;
  let tags: Tag[];

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/bookmark/create', () => {
    it('Should return 201 code with created bookmark', async () => {
      jwt = await testService.getJwtFromGoogleClientCredentials(
        app,
        testService.getGoogleClientCredentials,
      );
      tags = await testService.getAllTags(app);
      const questionToBookmark: Question =
        await testService.createQuestionWithTags(
          app,
          {
            title: 'something',
            question: 'something else',
            tags: [
              { id: tags[0].id, tagName: tags[0].tagName },
              { id: tags[1].id, tagName: tags[1].tagName },
            ],
          },
          jwt,
        );
      const response = await request(app.getHttpServer())
        .post('/bookmark/create')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ questionId: questionToBookmark.id });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('ownerId');
      expect(response.body).toHaveProperty('questionId');
      expect(response.body.relatedQuestion).toHaveProperty('id');
      expect(response.body.relatedQuestion).toHaveProperty('title');
      expect(response.body.relatedQuestion).toHaveProperty('question');
      expect(response.body.relatedQuestion).toHaveProperty('ownerId');
      expect(response.body.owner).toHaveProperty('id');
      expect(response.body.owner).toHaveProperty('email');
      expect(response.body.owner).toHaveProperty('name');
      expect(response.body.owner).toHaveProperty('image');
    });

    it('Should return 401 with not bad request', async () => {
      jwt = await testService.getJwtFromGoogleClientCredentials(
        app,
        testService.getGoogleClientCredentials,
      );
      const response = await request(app.getHttpServer())
        .post('/bookmark/create')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ questionId: 'invalid value' });
      expect(response.status).toBe(400);
      expect(response.body).toEqual(BookmarkInvalidQuestionIdError);
    });
  });
});
