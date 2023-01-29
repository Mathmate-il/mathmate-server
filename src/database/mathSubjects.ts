import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const mathSubjects = [
  'Algebra',
  'Calculus',
  'Geometry',
  'Trigonometry',
  'Linear Algebra',
  'Differential Equations',
  'Probability and Statistics',
  'Combinatorics',
  'Number Theory',
  'Topology',
  'Abstract Algebra',
  'Analysis',
  'Logic',
  'Number Systems',
  'Set Theory',
  'Graph Theory',
  'Combinatorial Game Theory',
  'Number Systems',
  'Fractals and Chaos Theory',
];

export async function seedTagTable() {
  for (const subject of mathSubjects) {
    const existingTag = await prisma.tag.findFirst({
      where: { tagName: subject },
    });
    if (!existingTag) {
      await prisma.tag.create({
        data: { tagName: subject },
      });
    }
  }
}
