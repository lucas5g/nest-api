import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateWordDto } from './dto/update-word.dto';
import { CreateWordDto } from 'src/word/dto/create-word.dto';
import { FindWordDto } from 'src/word/dto/find-word.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class WordService {
  constructor(private prisma: PrismaService) {}

  async create(createWordDto: CreateWordDto) {
    const wordExist = await this.prisma.word.count({
      where: {
        name: createWordDto.name,
      },
    });

    if (wordExist > 0) {
      throw new BadRequestException(`Palavra ${createWordDto.name} já existe.`);
    }

    return this.prisma.word.create({
      data: createWordDto,
    });
  }

  async findAll(findWordDto: FindWordDto) {
    const where: Prisma.WordWhereInput = {
      ...findWordDto,
      name: {
        contains: findWordDto.name,
      },
    };

    const [count, words] = await this.prisma.$transaction([
      this.prisma.word.count({ where }),
      this.prisma.word.findMany({
        where,
        orderBy: {
          name: 'asc',
        },
        take: 100,
      }),
    ]);

    return { count, words };
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
