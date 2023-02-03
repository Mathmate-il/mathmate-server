import { INestApplication } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../../src/config/config.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { RepositoriesModule } from './../../src/repositories/repositories.module';
import { JwtStrategy } from '../../src/services/auth/utils/auth.strategy';
import { AuthService } from '../../src/services/auth/auth.service';
import { UserService } from '../../src/services/user/user.service';
import { UserController } from '../../src/services/user/user.controller';
import { AuthController } from '../../src/services/auth/auth.controller';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

export class TestService {
  constructor(
    public googleClientCredentials = process.env.GOOGLE_CLIENT_CREDENTIALS,
  ) {}

  public get getGoogleClientCredentials() {
    return this.googleClientCredentials;
  }

  public async createTestModule() {
    return await Test.createTestingModule({
      controllers: [AuthController, UserController],
      providers: [AuthService, UserService, JwtStrategy],
      imports: [RepositoriesModule, PrismaModule, AppConfigModule, JwtModule],
    }).compile();
  }

  public async getJwtFromGoogleClientCredentials(
    app: INestApplication,
    credentials: string,
  ): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('authorization', credentials);
    return response.body.token;
  }
}

const testService = new TestService();
export default testService;
