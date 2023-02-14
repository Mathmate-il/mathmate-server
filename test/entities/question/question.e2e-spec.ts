import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import testService from '../../shared/testService';
import * as request from 'supertest';
import {
  inValidCreateQuestionDto,
  validCreateQuestionDto,
  inValidTagsDto,
  validTagsDto,
  inValidOwnerIdDto,
} from './utils/question.cases';
import { NotFoundTagError, NotFoundError } from './utils/question.errors';
import { Tag } from '@prisma/client';

describe('QuestionController', () => {
  let validOwnerIdDto = '';
  let app: INestApplication;
  let jwt: string;
  let tags: Tag[];
  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('/question', () => {
    it('should return 201 Created if input is valid', async () => {
      jwt = await testService.getJwtFromGoogleClientCredentials(
        app,
        testService.getGoogleClientCredentials,
      );
      tags = await testService.getAllTags(app);
      validCreateQuestionDto.tags[0].id = tags[0].id;
      validCreateQuestionDto.tags[1].id = tags[1].id;
      const response = await request(app.getHttpServer())
        .post('/question/create')
        .set('Authorization', `Bearer ${jwt}`)
        .send(validCreateQuestionDto);
      expect(response.status).toBe(201);
      expect(response.body.title).toMatch(validCreateQuestionDto.title);
      expect(typeof response.body.ownerId).toBe('string');
      validOwnerIdDto = response.body.ownerId;
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
      validTagsDto.tags[0].id = tags[0].id;
      validTagsDto.tags[1].id = tags[1].id;
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/tags')
        .send(validTagsDto);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Should return 404 Not Found if tag input is invalid', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/tags')
        .send(inValidTagsDto);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(NotFoundTagError);
    });

    it('Should return all the questions filtered by OwnerId', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/owner')
        .send({ id: validOwnerIdDto });
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Should return an 404 NotFound when ownerId does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/question/all/filterBy/owner')
        .send(inValidOwnerIdDto);
      expect(response.status).toBe(404);
      expect(response.body).toEqual(NotFoundError);
    });
  });
});
