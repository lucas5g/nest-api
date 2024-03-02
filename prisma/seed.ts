import { PrismaClient } from '@prisma/client';
import { books, words } from './data';
import { faker } from '@faker-js/faker'
const prisma = new PrismaClient();

async function main() {

  // for (let i = 1; i < 100_000; i++) {
  //   await prisma.word.create({
  //     data: {
  //       name: faker.lorem.word() + new Date().valueOf(),
  //       meaning: faker.lorem.words(),
  //       bookId: 1,
  //       fixed: false
  //     }
  //   })
  // }

  // return

  for (const book of books) {
    await prisma.book.upsert({
      where: { name: book.name },
      create: book,
      update: book
    })
  }

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
