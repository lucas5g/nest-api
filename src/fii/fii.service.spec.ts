import { Test, TestingModule } from '@nestjs/testing';
import { FiiService } from './fii.service';
import { CreateFiiDto } from 'src/fii/dto/create-fii.dto';

describe('FiiService', () => {
  let service: FiiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FiiService],
    }).compile();

    service = module.get<FiiService>(FiiService);
  });

  it('create', () => {

    const data: CreateFiiDto = {
      id: 'htmx11'      
    }

    const res = await service.create(data)

    expect(res).toHaveProperty('id')
  });
});
