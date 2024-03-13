import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull'
import { Queue, Job } from 'bull'
@Injectable()
@Processor('user')
export class UserService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('user') private userQueue: Queue
  ) { }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    });

  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  removeAll() {
    return this.prisma.user.deleteMany({})
  }

  async addQueue(createUserDto: CreateUserDto) {

    const { data } = await this.userQueue.add(createUserDto)
    return data

  }

  @Process()
  async consumerQueue(job: Job) {
    await this.create(job.data)
  }
}
