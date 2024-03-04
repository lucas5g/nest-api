import { Test, TestingModule } from '@nestjs/testing';
import { ManageService } from './manage.service';

describe('ManageService', () => {
  let service: ManageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageService],
    }).compile();

    service = module.get<ManageService>(ManageService);
  });

  it('find all', () => {
    const res = service.findAll();

    console.log(res)
  });
});
