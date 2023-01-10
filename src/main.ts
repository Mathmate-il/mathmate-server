import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './auth/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);
  app.enableCors({
    origin: config.getConfig().app.cors.origin,
  });
  await app.listen(3001);
}

bootstrap();
