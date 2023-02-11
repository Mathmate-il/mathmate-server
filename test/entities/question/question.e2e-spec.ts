import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import testService from '../../shared/testService';
import * as request from 'supertest';
import {
  inValidCreateQuestionDto,
  inValidOwnerId,
  inValidTags,
  validCreateQuestionDto,
  validTags,
} from './utils/question.cases';
import { NotFoundTagError, NotFoundError } from './utils/question.errors';

describe('QuestionController', () => {
  let app: INestApplication;
  let jwt: string;
  const validOwnerId: { id: string } = {
    id: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    await app.init();
  });

  describe('/question', () => {
    it('should return 201 Created if input is valid', async () => {
      jwt = await testService.getJwtFromGoogleClientCredentials(
        app,
        testService.getGoogleClientCredentials,
      );

      const response = await request(app.getHttpServer())
        .post('/question/create')
        .set('Authorization', `Bearer ${jwt}`)
        .send(validCreateQuestionDto);
      validOwnerId.id = response.body.ownerId;
      expect(response.status).toBe(201);
      expect(response.body.title).toMatch(validCreateQuestionDto.title);
      expect(typeof response.body.ownerId).toBe('string');
    });

    it('should return 404 Not Found if input is invalid', async () => {
      jwt = await testService.getJwtFromGoogleClientCredentials(
        app,
        testService.getGoogleClientCredentials,
      );

      const response = await request(app.getHttpServer())
        .post('/question/create')
        .set('Authorization', `Bearer ${jwt}`)
        .send(inValidCreateQuestionDto);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(NotFoundTagError);
    });

    it('Should return all the questions', async () => {
      const response = await request(app.getHttpServer()).get('/question/all');
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Should return all the questions filtered by tags', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/tags')
        .send(validTags);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Should return 404 Not Found if tag input is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/tags')
        .send(inValidTags);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(NotFoundTagError);
    });

    it('Should return all the questions filtered by OwnerId', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/owner')
        .send(validOwnerId);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Should return an 404 NotFound when ownerId does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/owner')
        .send(inValidOwnerId);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(NotFoundError);
    });
  });
});
