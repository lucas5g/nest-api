import { Injectable } from '@nestjs/common';
import { CreateManageDto } from './dto/create-manage.dto';
import { UpdateManageDto } from './dto/update-manage.dto';
import { ManageEntity } from 'src/manage/entities/manage.entity';

@Injectable()
export class ManageService {
  create(createManageDto: CreateManageDto) {
    return 'This action adds a new manage';
  }

  findAll() {

    return [
      {
        'id': 1,
        'name': 'João',
        'age': 25,
        'password': 'qwe'
      },
      {
        'id': 2,
        'name': 'Maria',
        'age': 30,
        'password': 'qwe'

      }
    ];

    

  }

  findOne(id: number) {
    return `This action returns a #${id} manage`;
  }

  update(id: number, updateManageDto: UpdateManageDto) {
    return `This action updates a #${id} manage`;
  }

  remove(id: number) {
    return `This action removes a #${id} manage`;
  }
}
