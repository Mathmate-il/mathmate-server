import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
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
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", 'https://oauth2.googleapis.com'],
          connectSrc: ["'self'", 'https://oauth2.googleapis.com'],
        },
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mathmate API')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        clientCredentials: {
          tokenUrl: 'https://oauth2.googleapis.com/token',
          authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
          scopes: {},
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  console.log(
    'You can use the swagger UI in the following url: http://localhost:3001/api',
  );
}

bootstrap();
