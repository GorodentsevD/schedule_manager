import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {HomeData} from "./types/homeData";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): HomeData {
    return this.appService.get();
  }
}
