import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: AppConfigService) {
    super({
      datasources: {
        db: {
          url:
            process.env.NODE_ENV === 'test'
              ? process.env.TEST_DATABASE_URL
              : process.env.DATABASE_URL,
        },
      },
    });
  }
}
