import { Injectable, Get } from '@nestjs/common';
import {name, version} from '../package.json';
import {HomeData} from "./types/homeData";

@Injectable()
export class AppService {

  @Get()
  get(): HomeData {
    return { name, version };
  }
}
