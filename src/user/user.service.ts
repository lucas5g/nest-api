import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull';
import { Queue, Job } from 'bull';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
@Injectable()
@Processor('user')
export class UserService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('user') private userQueue: Queue,
  ) {}

  async sendQueue(createUserDto: CreateUserDto) {
    const { data } = await this.userQueue.add(createUserDto);
    return data;
  }

  @Process()
  async consumerQueue(job: Job) {
    console.log(job.data);
    await this.create(job.data);
    //method async
  }

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  removeAll() {
    return this.prisma.user.deleteMany({});
  }
}
