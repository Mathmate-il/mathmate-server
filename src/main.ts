import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './dev/all-exceptions.filter';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import config from './config/config.singleton';
import databaseSeeder from './database/seeder';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const allExceptionsFilter = new AllExceptionsFilter();
  const publicPath = join(__dirname, '..', 'public');
  const viewsPath = join(__dirname, '..', 'views');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(allExceptionsFilter.writeApiRequestsLogToFile());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  app.useStaticAssets(publicPath);
  app.setBaseViewsDir(viewsPath);
  app.setViewEngine('hbs');
  config.createSwaggerConfiguration(app);
  await app.listen(config.appPort);
  console.log(
    '\x1b[1;34m 🚀 Swagger UI available at http://localhost:3000/swagger 🚀\x1b[0m',
  );
  console.log(
    '\x1b[1;34m 🔑 Google credentials available at http://localhost:3000/dev/google/auth 🔑\x1b[0m',
  );

  setTimeout(() => {
    databaseSeeder.seedTagTable();
  }, 9000);
}

bootstrap();
