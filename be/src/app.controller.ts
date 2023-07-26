import {Body, Controller, Get, HttpStatus, Post, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
  ) {}


  @Post()
  log(@Res() res: Response,@Body() body : {logs : string[]}) : any {
    res.status(HttpStatus.OK).json(this.appService.partArrayLogToJSON());
  }

}
