import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  Post,
  Query,
} from '@nestjs/common';
import { WordService } from './word.service';
import { UpdateWordDto } from './dto/update-word.dto';
import { CreateWordDto } from 'src/word/dto/create-word.dto';
import { FindWordDto } from 'src/word/dto/find-word.dto';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@Body() createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get()
  findAll(@Query() findWordDto: FindWordDto) {
    return this.wordService.findAll(findWordDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
