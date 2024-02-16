import { Test, TestingModule } from '@nestjs/testing';
import { WordService } from './word.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWordDto } from './dto/create-word.dto';

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

  it('create', async () => {
    const payload = {
      bookId: 1,
      fixed: false,
      meaning: 'significado test',
      name: 'test',
    };
    const res = await service.create(payload);

    expect(res).toMatchObject(payload);

    await service.remove(res.id);
  });

  it('create word that already exists', async () => {
    const payload: CreateWordDto = {
      bookId: 1,
      fixed: false,
      meaning: 'test',
      name: 'test',
    };

    const res = await service.create(payload);

    await expect(service.create(payload)).rejects.toThrow('já existe.');

    await service.remove(res.id);
  });
});
