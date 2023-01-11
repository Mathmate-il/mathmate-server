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
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || 'Enter client id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'Enter client secret',
      },
      jwt: {
        secret: process.env.JWT_SECRET || "secret",
      },
    },
  };
};

export interface AppConfig {
  port: number;
  cors: {
    origin: string;
  }
}

export interface DatabaseConfig {
  url: string;
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
