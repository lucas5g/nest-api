import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.word.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.word.findFirstOrThrow({
      where: { id },
    });
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return this.prisma.word.update({
      where: { id },
      data: updateWordDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}
