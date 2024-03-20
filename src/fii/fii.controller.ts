import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FiiService } from './fii.service';
import { CreateFiiDto } from './dto/create-fii.dto';
import { UpdateFiiDto } from './dto/update-fii.dto';

@Controller('fii')
export class FiiController {
  constructor(private readonly fiiService: FiiService) {}

  @Post()
  create(@Body() createFiiDto: CreateFiiDto) {
    return this.fiiService.create(createFiiDto);
  }

  @Get()
  findAll() {
    return this.fiiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fiiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFiiDto: UpdateFiiDto) {
    return this.fiiService.update(+id, updateFiiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fiiService.remove(id);
  }
}
