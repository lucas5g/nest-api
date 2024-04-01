import { Test, TestingModule } from '@nestjs/testing';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('MessageGateway', () => {
  let gateway: MessageGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageGateway,
        MessageService,
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    }).compile();

    gateway = module.get<MessageGateway>(MessageGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
