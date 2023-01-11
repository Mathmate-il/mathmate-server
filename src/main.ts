import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  app.enableCors({
    origin: config.getConfig().app.cors.origin,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  await app.listen(3001);
}

bootstrap();
