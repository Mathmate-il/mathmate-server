import config from '@/config/config.singleton';
import { PrismaClient } from '@prisma/client';
import { mathSubjects } from '../../prisma/seed/objects';
export class DatabaseSeeder {
  constructor(
    private readonly prismaService = new PrismaClient({
      datasources: {
        db: {
          url: config.dbUrl,
        },
      },
    }),
  ) {}

  public async seedTagTable() {
    for (const subject of mathSubjects) {
      const existingTag = await this.prismaService.tag.findFirst({
        where: { tagName: subject },
      });
      if (!existingTag) {
        await this.prismaService.tag.create({
          data: { tagName: subject },
        });
      }
    }
  }
}

const databaseSeeder = new DatabaseSeeder();
export default databaseSeeder;
