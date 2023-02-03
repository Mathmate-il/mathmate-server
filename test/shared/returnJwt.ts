import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export async function returnJwtFromGoogleAuth(
  app: INestApplication,
  credentials: string,
): Promise<string> {
  const response = await request(app.getHttpServer())
    .post('/auth/login')
    .set('authorization', credentials);
  return response.body.token;
}
