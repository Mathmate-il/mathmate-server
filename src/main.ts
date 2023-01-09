import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: config.get('LOCALHOST'),
  });
  await app.listen(3001);
}

bootstrap();
