import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, PrismaService],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('find all', async() => {
    const res = await service.findAll()

    res.forEach( book => {
      expect(book).toHaveProperty('id')
      expect(book).toHaveProperty('name')
    })
  });
});
