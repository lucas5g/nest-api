import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from 'src/book/dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }
}
