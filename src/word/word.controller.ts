import { Controller, Get, Param, Delete, Patch, Body } from '@nestjs/common';
import { WordService } from './word.service';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  findAll() {
    return this.wordService.findAll();
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
