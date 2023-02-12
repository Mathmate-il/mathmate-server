import testService from '../../shared/testService';
import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('BookmarkController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await testService.createTestModule();
    app = module.createNestApplication();
    await app.init();
  });
});
