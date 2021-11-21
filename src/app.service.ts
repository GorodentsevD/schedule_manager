import { Injectable, Get, Post } from '@nestjs/common';

@Injectable()
export class AppService {

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
