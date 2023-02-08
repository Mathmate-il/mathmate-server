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
    let url = '';
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'dev') {
      url = process.env.TEST_DATABASE_URL;
    } else if (nodeEnv === 'test') {
      url = process.env.DATABASE_URL;
    }
    return url;
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
