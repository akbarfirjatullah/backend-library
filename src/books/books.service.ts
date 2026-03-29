import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  getInfo(): object {
    return {
      message: 'API Library v1',
      feature: 'books',
    };
  }

  healthCheck(): object {
    return {
      status: 'ok',
      service: 'books',
    };
  }
}