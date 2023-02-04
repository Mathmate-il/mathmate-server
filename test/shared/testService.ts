import { PrismaModule } from '../../src/prisma/prisma.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigModule } from '../../src/config/config.module';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { RepositoriesModule } from '@/repositories/repositories.module';
import { AuthService } from '@/services/auth/auth.service';
import { AuthController } from '@/services/auth/auth.controller';
import { UserController } from '@/services/user/user.controller';
import { UserService } from '@/services/user/user.service';
import { JwtStrategy } from '@/services/auth/utils/auth.strategy';

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
    credentials: string | undefined,
  ): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .set('authorization', credentials);
    return response.body.token;
  }
}

const testService = new TestService();
export default testService;
