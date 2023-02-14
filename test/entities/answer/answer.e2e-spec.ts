import testService from '../../shared/testService';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('AnswerController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('', () => {
    return undefined;
  });
});
