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
import { LOGGER_INJECTION_KEY } from './logger/logger.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get(LOGGER_INJECTION_KEY)
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

  logger.debug('🚀 Swagger UI available at http://localhost:3000/swagger 🚀');
  logger.debug('🔑 Google credentials available at http://localhost:3000/dev/google/auth 🔑');

  setTimeout(() => {
    databaseSeeder.seedTagTable();
  }, 9000);
}

bootstrap();
