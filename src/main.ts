import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { seedTagTable } from './database/mathSubjects';
import 'reflect-metadata';
import * as fs from 'fs';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

  const append = 'a';
  const logStream = fs.createWriteStream('logs/api.log', { flags: append });
  app.use(morgan('tiny', { stream: logStream }));

  app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mathmate API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3001);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  console.log(
    '\x1b[1;34m 🚀 You can use the swagger UI in the following url: http://localhost:3001/swagger 🚀\x1b[0m',
  );
  console.log(
    '\x1b[1;34m 🔑 You can get your google credentials in http://localhost:3001/dev/google/auth 🔑\x1b[0m',
  );

  seedTagTable();
}

bootstrap();
