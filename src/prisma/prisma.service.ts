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
            process.env.NODE_ENV === 'docker'
              ? config.getConfig().database.docker_url
              : config.getConfig().database.url,
        },
      },
    });
  }
}
