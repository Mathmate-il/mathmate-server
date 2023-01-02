import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  public exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
    for (const key of keys) {
      delete object[key];
    }
    return object;
  }
}
