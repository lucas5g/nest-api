import { Controller, Get } from '@nestjs/common';
import { version } from '../package.json';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { api: 'Api nestjs '.concat(version) };
  }
}
