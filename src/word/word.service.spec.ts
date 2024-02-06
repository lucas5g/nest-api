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

  it('find one', async () => {
    const res = await service.findOne(1);

    expect(res).toHaveProperty('name');
    expect(res).toHaveProperty('meaning');
    expect(res).toHaveProperty('book');
    expect(res).toHaveProperty('fixed');
  });

  it('update', async () => {
    const res = await service.update(1, { fixed: true });

    expect(res.fixed).toEqual(true);
  });
});
