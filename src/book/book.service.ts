import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const words = await this.prisma.word.findMany({
      distinct: 'book',
    });

    return words.map((word, i) => {
      return {
        id: ++i,
        name: word.book,
      };
    });
  }
}
