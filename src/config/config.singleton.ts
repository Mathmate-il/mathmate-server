import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Configuration {
  public get googleClientId() {
    return process.env.GOOGLE_CLIENT_ID || '';
  }
  public get googleSecret() {
    return process.env.GOOGLE_CLIENT_SECRET || '';
  }
  public get jwtSecret() {
    return process.env.JWT_SECRET || '';
  }
  public get appPort() {
    return process.env.APP_PORT || 3000;
  }

  public get appAllowedOrigin() {
    return '*';
  }

  public get dbUrl() {
    return process.env.DATABASE_URL;
  }

  public get nodeEnv() {
    return process.env.NODE_ENV || 'development';
  }

  public createSwaggerConfiguration(app: INestApplication) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Mathmate API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document);
  }
}

const config = new Configuration();
export default config;
