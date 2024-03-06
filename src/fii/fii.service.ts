import { Injectable } from '@nestjs/common';
import { CreateFiiDto } from './dto/create-fii.dto';
import { UpdateFiiDto } from './dto/update-fii.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FiiService {
  constructor(private prisma: PrismaService){}
  create(createFiiDto: CreateFiiDto) {
    return this.prisma.fii.create({
      data: createFiiDto
    });
  }

  findAll() {
    return `This action returns all fii`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fii`;
  }

  update(id: number, updateFiiDto: UpdateFiiDto) {
    return `This action updates a #${id} fii`;
  }

  remove(id: number) {
    return `This action removes a #${id} fii`;
  }
}
