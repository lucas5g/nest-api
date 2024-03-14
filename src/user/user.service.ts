import { PrismaService } from '@/prisma/prisma.service';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectQueue, Processor, Process } from '@nestjs/bull'
import { Queue, Job } from 'bull'
import { randomInt } from 'node:crypto';
@Injectable()
@Processor('user')
export class UserService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('user') private userQueue: Queue
  ) { }

  async sendQueue(createUserDto: CreateUserDto) {

    const { data } = await this.userQueue.add(createUserDto)
    return data

  }

  @Process()
  async consumerQueue(job: Job) {
    console.log(job.data)
    await this.create(job.data)
  }


  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto
    });

  }

  findAll() {
    if (randomInt(50) > 40) {
      throw new Error('erro ao buscar')
      throw new UnprocessableEntityException('não pod buscar')
    }
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 5
    });
  }


  findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id }
    });
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


}
