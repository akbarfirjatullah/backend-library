import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('info')
  info() {
    return this.booksService.getInfo();
  }

  @Get('health')
  health() {
    return this.booksService.healthCheck();
  }

  @Get()
  findAll() {
    return { message: 'Daftar buku (sementara)' };
  }
}