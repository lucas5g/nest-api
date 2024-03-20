import { Injectable } from '@nestjs/common';
import { CreateFiiDto } from './dto/create-fii.dto';
import { UpdateFiiDto } from './dto/update-fii.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FiiService {
  constructor(private prisma: PrismaService) {}
  create(createFiiDto: CreateFiiDto) {
    return this.prisma.fii.create({
      data: createFiiDto,
    });
  }

  findAll() {
    return this.prisma.fii.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} fii`;
  }

  update(id: number, updateFiiDto: UpdateFiiDto) {
    console.log(updateFiiDto);
    return `This action updates a #${id} fii`;
  }

  remove(id: string) {
    return this.prisma.fii.delete({
      where: { id },
    });
  }
}
