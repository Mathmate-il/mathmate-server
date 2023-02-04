import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger/dist';
import { ConfigFactory } from '@nestjs/config';

export const configFactory: ConfigFactory<{ config: IConfiguration }> = () => {
  return {
    config: {
      app: {
        port: +process.env.APP_PORT || 3000,
        cors: {
          origin: process.env.APP_CORS_ORIGIN || 'localhost',
        },
      },
      database: {
        url:
          process.env.DATABASE_URL ||
          'postgresql://postgres:postgres@postgres:5432/mathmate?schema=public',
        docker_url:
          process.env.DOCKER_DATABASE_URL ||
          'postgresql://postgres:postgres@postgres:5432/mathmate?schema=public',
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'Enter client id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'Enter client secret',
      },
      jwt: {
        secret: process.env.JWT_SECRET || 'secret',
      },
    },
  };
};

export const createSwaggerConfig = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Mathmate API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);
};

export interface AppConfig {
  port: number;
  cors: {
    origin: string;
  };
}

export interface DatabaseConfig {
  url: string;
  docker_url: string;
}

export interface GoogleConfig {
  clientId: string;
  clientSecret: string;
}

export interface JWTConfig {
  secret: string;
}

export interface IConfiguration {
  app: AppConfig;
  database: DatabaseConfig;
  google: GoogleConfig;
  jwt: JWTConfig;
}
