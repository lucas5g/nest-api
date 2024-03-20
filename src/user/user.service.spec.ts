import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { BullModule } from '@nestjs/bull';
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

  it.only('find all', async () => {
    console.time();
    const creaties = [];

    for (let i = 0; i <= 11000; i++) {
      creaties.push(
        service.sendQueue({ name: new Date().toISOString().slice(17, 23) }),
      );
      // creaties.push(service.create({ name: new Date().toISOString().slice(17, 23) }))
    }

    const res = await Promise.all(creaties);

    expect(res).toBe;
  });
});
