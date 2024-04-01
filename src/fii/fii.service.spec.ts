import { Test, TestingModule } from '@nestjs/testing';
import { FiiService } from './fii.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('FiiService', () => {
  let service: FiiService;
  // let id: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiiService, PrismaService],
    }).compile();

    service = module.get<FiiService>(FiiService);
  });

  // beforeAll(async() => {
  //   const data: CreateFiiDto = {
  //     id: 'htmx11'
  //   }

  //   const res = await service.create(data)

  //   expect(res).toHaveProperty('id')
  // })

  // afterAll(async() => {
  //   await service.remove(id)
  // })

  it('find all', async () => {
    const res = await service.findAll();

    expect(res).toBe
  });
});
