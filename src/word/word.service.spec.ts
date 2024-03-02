import { Test, TestingModule } from '@nestjs/testing';
import { WordService } from './word.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWordDto } from './dto/create-word.dto';

describe('WordService', () => {
  let service: WordService;
  let id: number;

  const properties = [
    'id',
    'name',
    'meaning',
    'fixed',
    'createdAt',
    'updatedAt',
    'bookId',
  ];
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordService, PrismaService],
    }).compile();

    service = module.get<WordService>(WordService);

    const data: CreateWordDto = {
      bookId: 2,
      fixed: false,
      meaning: 'test meaning',
      name: 'test-word',
    };

    const word = await service.create(data);
    id = word.id;
  });

  afterAll(async () => {
    await service.remove(id);
  });

  it('find all', async () => {
    const { count, words } = await service.findAll({});

    expect(count).not.toBeNaN();
    words.forEach((word) => {
      expect(Object.keys(word)).toEqual(properties);
    });
  });

  it('find by name', async () => {
    const { words } = await service.findAll({ name: 'sub' });

    expect(words.length).toBeLessThanOrEqual(100);

    words.forEach((word) => {
      expect(word.name).toContain('sub');
    });
  });

  it('find by book', async () => {
    const { words } = await service.findAll({ bookId: 2 });

    words.forEach((word) => {
      expect(word.bookId).toEqual(2);
    });
  });

  it('find one', async () => {
    const res = await service.findOne(id);
    expect(Object.keys(res)).toEqual(properties);
    expect(res.id).toEqual(id);
  });

  it('update', async () => {
    const res = await service.update(id, { fixed: true });

    expect(res.fixed).toEqual(true);
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
