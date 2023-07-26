import {Body, Controller, Get, HttpStatus, InternalServerErrorException, Post, Res} from '@nestjs/common';
import {AppService} from "../app.service";
import {Response} from "express";
import {response} from "../../util/helper";
import {CreateLogDto} from "../DTO/createLog.dto";

@Controller('api')
export class LogController {
  constructor(
      private readonly appService: AppService,
  ) {
  }

  @Get('logs')
  async findAll(@Res() res: Response) {
    try{
      res.status(HttpStatus.OK).json(
          response(await this.appService.getAllLog(),HttpStatus.OK)
      );
    } catch (e) {
      throw new InternalServerErrorException()
    }

  }

  @Get('recommended-book')
  async recommendedBook(@Res() res: Response) {
    try{
      res.status(HttpStatus.OK).json(
          response(await this.appService.partArrayLogToJSON(),HttpStatus.OK)
      );
    } catch (e) {
      throw new InternalServerErrorException()
    }

  }

  @Post('logs')
  async createLog(@Res() res: Response,@Body() body : CreateLogDto) {
    try {
      res.status(HttpStatus.OK).json(
          response(await this.appService.createLog(body),HttpStatus.OK)
      );
    } catch (e) {
      throw new InternalServerErrorException(e)
    }
  }
}