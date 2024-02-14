import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateWordDto } from './dto/update-word.dto';
import { CreateWordDto } from 'src/word/dto/create-word.dto';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  create(createWordDto: CreateWordDto) {
    return this.prisma.word.create({
      data: createWordDto,
    });
  }

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
    return this.prisma.word.delete({
      where: { id },
    });
  }
}
