import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppConfigService } from '../../config/config.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private readonly config: AppConfigService) {
    super({
      datasources: {
        db: {
          url: config.getConfig().database.url,
        },
      },
    });
  }

  public cleanAll() {
    this.$transaction([this.user.deleteMany()]);
  }
}
