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
      expect(row).toHaveProperty('name');
      expect(row).toHaveProperty('meaning');
      expect(row).toHaveProperty('book');
      expect(row).toHaveProperty('fixed');
    });
  });
});
