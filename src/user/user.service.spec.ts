import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BullModule } from '@nestjs/bull';
import { setTimeout } from 'timers/promises';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'user',
        }),
      ],
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('find all', async () => {
    const creaties = [];
    const count = 5;

    for (let i = 0; i <= count; i++) {
      creaties.push(
        service.sendQueue({ name: new Date().toISOString().slice(17, 23) }),
      );
      // creaties.push(service.create({ name: new Date().toISOString().slice(17, 23) }))
    }

    await Promise.allSettled(creaties);

    await setTimeout(count);
  }, 7000);
});
