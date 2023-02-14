import { BookmarkController } from './../../src/services/bookmark/bookmark.controller';
import { CreateQuestionDto } from './../../src/services/question/dto/CreateQuestionDto';
import { TagController } from './../../src/services/tag/tag.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: '.env.test',
});
import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { RepositoriesModule } from '@/repositories/repositories.module';
import { AuthService } from '@/services/auth/auth.service';
import { AuthController } from '@/services/auth/auth.controller';
import { UserController } from '@/services/user/user.controller';
import { UserService } from '@/services/user/user.service';
import { JwtStrategy } from '@/services/auth/utils/auth.strategy';
import { Prisma, PrismaClient, Tag } from '@prisma/client';
import { TagService } from '@/services/tag/tag.service';
import { QuestionController } from '@/services/question/question.controller';
import { QuestionService } from '@/services/question/question.service';
import { BookmarkService } from '@/services/bookmark/bookmark.service';
import { DatabaseSeeder } from '@/database/seeder';
import { Configuration } from '@/config/config.singleton';

export class TestService {
  constructor(
    public googleClientCredentials = process.env.GOOGLE_CLIENT_CREDENTIALS,
  ) {}

  public get getGoogleClientCredentials() {
    return this.googleClientCredentials;
  }
  public async dropDbTables() {
    const prisma = new PrismaClient();
    try {
      await prisma.$queryRaw(Prisma.sql`DROP SCHEMA public CASCADE;`);
      await prisma.$queryRaw(Prisma.sql`CREATE SCHEMA public;`);
    } catch (error) {
      console.log(error);
    }
  }

  public async createTestModule() {
    return await Test.createTestingModule({
      controllers: [
        AuthController,
        UserController,
        TagController,
        QuestionController,
        BookmarkController,
      ],
      providers: [
        AuthService,
        UserService,
        JwtStrategy,
        TagService,
        QuestionService,
        BookmarkService,
        DatabaseSeeder,
        Configuration,
      ],
      imports: [RepositoriesModule, PrismaModule, JwtModule],
    }).compile();
  }

  public async getJwtFromGoogleClientCredentials(
    app: INestApplication,
    credentials: string | undefined,
  ): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('authorization', credentials);
    return response.body.token;
  }

  public async getAllTags(app: INestApplication): Promise<Tag[]> {
    const { body } = await request(app.getHttpServer()).get('/tag/all');
    const tags = body.map((tag: Tag) => {
      return { id: tag.id };
    });
    return tags;
  }

  public async createQuestionWithTags(
    app: INestApplication,
    question: CreateQuestionDto,
    jwt: string,
  ) {
    const response = await request(app.getHttpServer())
      .post('/question/create')
      .set('Authorization', `Bearer ${jwt}`)
      .send(question);
    return response.body;
  }

  public async getCurrentUserByJwt(app: INestApplication, jwt: string) {
    const response = await request(app.getHttpServer())
      .get('users/me')
      .set('Authorization', `Bearer ${jwt}`);
    return response.body;
  }
}

const testService = new TestService();
export default testService;
