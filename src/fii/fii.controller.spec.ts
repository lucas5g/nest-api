import { Test, TestingModule } from '@nestjs/testing';
import { FiiController } from './fii.controller';
import { FiiService } from './fii.service';

describe('FiiController', () => {
  let controller: FiiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FiiController],
      providers: [FiiService],
    }).compile();

    controller = module.get<FiiController>(FiiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
