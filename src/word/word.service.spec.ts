import { Test, TestingModule } from '@nestjs/testing';
import { WordService } from './word.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WordService', () => {
  let service: WordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordService, PrismaService],
    }).compile();

    service = module.get<WordService>(WordService);
  });

  it('find all', async () => {
    const res = await service.findAll();

    res.forEach((row) => {
      ['name', 'meaning', 'bookId', 'fixed'].forEach((property) => {
        expect(row).toHaveProperty(property);
      });
    });
  });

  it('find one', async () => {
    const res = await service.findOne(1);
    ['name', 'meaning', 'bookId', 'fixed'].forEach((property) => {
      expect(res).toHaveProperty(property);
    });
  });

  it('update', async () => {
    const res = await service.update(1, { fixed: true });

    expect(res.fixed).toEqual(true);
  });
});
