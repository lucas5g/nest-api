import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from 'src/book/dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.book.findMany({
      include: {
        _count: true,
      },
    });
  }

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
