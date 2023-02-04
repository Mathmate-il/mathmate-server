import { createSwaggerConfig } from './config/config.factory';
import { AppConfigService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { seedTagTable } from './database/mathSubjects';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const publicPath = join(__dirname, '..', 'public');
  const viewsPath = join(__dirname, '..', 'views');

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());
  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
  });

  app.useStaticAssets(publicPath);
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');
  createSwaggerConfig(app);
  await app.listen(3000);
  seedTagTable();

  console.log(
    '\x1b[1;34m 🚀 Swagger UI available at http://localhost:3000/swagger 🚀\x1b[0m',
  );
  console.log(
    '\x1b[1;34m 🔑 Google credentials available at http://localhost:3000/dev/google/auth 🔑\x1b[0m',
  );
}

bootstrap();
