import { PrismaClient } from '@prisma/client';
import words from './data.json';
const prisma = new PrismaClient();

async function main() {
  for (const word of words) {
    word.name = word.name.toLowerCase();
    await prisma.word.upsert({
      where: { name: word.name },
      update: word,
      create: word,
    });
  }
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
