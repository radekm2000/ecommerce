import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Request } from 'express';

@Controller('main')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseGuards(AuthGuard)
  getHello(@Req() req: Request): string {
    return this.appService.getHello(req);
  }
}
