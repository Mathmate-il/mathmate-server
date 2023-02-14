import { PrismaClient } from '@prisma/client';
import { mathSubjects } from './objects';
const prisma = new PrismaClient();
async function main() {
  //   for (const subject of mathSubjects) {
  //     const existingTag = await prisma.tag.findFirst({
  //       where: { tagName: subject },
  //     });
  //     if (!existingTag) {
  //       await prisma.tag.create({
  //         data: { tagName: subject },
  //       });
  //     }
  //   }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
