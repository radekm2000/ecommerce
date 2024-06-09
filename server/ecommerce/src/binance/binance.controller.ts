import { Controller, Get, UsePipes } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { BinanceAccountInfo } from 'src/utils/dtos/binance.dto';

@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('/accountInfo')
  public async getBinanceAccountInfo() {
    return await this.binanceService.getAccountInfo(3);
  }
}
