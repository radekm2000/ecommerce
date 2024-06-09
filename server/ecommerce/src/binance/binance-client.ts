import { Logger } from '@nestjs/common';
import Binance from 'binance-api-node';
import 'dotenv/config';
import { TickerPrice, TickerPriceType } from 'src/utils/dtos/binance.dto';

type Config = {
  BINANCE_API_KEY: string;
  BINANCE_SECRET_KEY: string;
};

export class BinanceClient {
  private client: any;
  private logger: Logger;

  constructor(config: Config) {
    this.client = Binance({
      apiKey: config.BINANCE_API_KEY,
      apiSecret: config.BINANCE_SECRET_KEY,
    });
    this.logger = new Logger(BinanceClient.name);
  }

  public getBinanceAccountInfo = async () => {
    return await this.client.accountInfo();
  };

  public getSymbolTickerPrice = async (
    symbol: string,
  ): Promise<TickerPriceType> => {
    try {
      const tickerResponse: TickerPriceType = await this.client.prices({
        symbol,
      });

      const ticker: TickerPrice = {
        symbol: symbol,
        price: tickerResponse[symbol],
      };
      return ticker;
    } catch (error) {
      this.logger.error(`Error when getting price for symbol ${symbol}`);
    }
  };
}
