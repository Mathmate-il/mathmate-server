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
  app.use(helmet());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mathmate API')
    .setVersion('1.0')
    // .addBearerAuth(
    //   {
    //     // I was also testing it without prefix 'Bearer ' before the JWT
    //     description: `Please enter token in following format: Bearer <JWT>`,
    //     name: 'Authorization',
    //     bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
    //     scheme: 'Bearer',
    //     type: 'http', // I`ve attempted type: 'apiKey' too
    //     in: 'Header',
    //   },
    //   'access-token', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    // )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);

  console.log(
    'You can use the swagger UI in the following url: http://localhost:3001/api',
  );
}

bootstrap();
