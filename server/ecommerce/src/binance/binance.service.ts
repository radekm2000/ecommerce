import 'dotenv/config';
import { Injectable, Logger } from '@nestjs/common';
import { BinanceClient } from './binance-client';
import {
  BinanceAccountInfo,
  BinanceAccountInfoSchema,
  BinanceBalance,
  BinanceBalanceWithTotalValueAndSymbol,
  TickerPriceType,
} from 'src/utils/dtos/binance.dto';

const CURRENCY_FOR_TOKEN_PRICES = 'USDT';

@Injectable()
export class BinanceService {
  private logger: Logger;
  private binanceClient: BinanceClient;

  constructor() {
    this.logger = new Logger(BinanceService.name);
    this.binanceClient = new BinanceClient({
      BINANCE_API_KEY: process.env.BINANCE_API_KEY ?? '',
      BINANCE_SECRET_KEY: process.env.BINANCE_SECRET_KEY ?? '',
    });
  }

  public getAccountInfo = async (
    numberOfTopBalances: number,
    currencyName?: string,
  ): Promise<BinanceBalanceWithTotalValueAndSymbol[]> => {
    try {
      const accountInfo = await this.binanceClient.getBinanceAccountInfo();
      const parseResult = BinanceAccountInfoSchema.safeParse(accountInfo);
      if (parseResult.success) {
        const topBalances = this.mapBinanceAccountInfo(
          parseResult.data,
          numberOfTopBalances,
          currencyName,
        );
        return topBalances;
      } else if (parseResult.success === false) {
        this.logger.error(
          `Validation errors when parsing account info ${parseResult.error.errors}`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error when parsing binance account info ${error.message}`,
      );
    }
  };

  private mapBinanceAccountInfo = async (
    account: BinanceAccountInfo,
    numberOfTopBalances: number,
    currencyName?: string,
  ) => {
    const accountBalancesWithMinValue = account.balances.filter(
      (balance) => parseFloat(balance.free) >= 0.1,
    );

    const balancesWithTotalValueCalculated: BinanceBalanceWithTotalValueAndSymbol[] =
      await this.addTotalValueAndCurrencySymbolToBalances(
        accountBalancesWithMinValue,
        currencyName,
      );

    const sortedBalances = this.sortBalancesByTotalValue(
      balancesWithTotalValueCalculated,
    );

    const topBalances = sortedBalances.slice(0, numberOfTopBalances);

    return topBalances;
  };

  private sortBalancesByTotalValue = (
    balances: BinanceBalanceWithTotalValueAndSymbol[],
  ) => {
    return balances.sort(
      (a, b) => parseFloat(b.totalValue) - parseFloat(a.totalValue),
    );
  };

  private addTotalValueAndCurrencySymbolToBalances = async (
    balances: BinanceBalance[],
    currencyName?: string,
  ) => {
    return await Promise.all(
      balances.map(async (balance) => {
        const symbol = currencyName
          ? `${balance.asset}${currencyName.toUpperCase()}`
          : `${balance.asset}${CURRENCY_FOR_TOKEN_PRICES}`;
        if (balance.asset === CURRENCY_FOR_TOKEN_PRICES) {
          return {
            asset: balance.asset,
            free: balance.free,
            locked: balance.locked,
            symbol: balance.asset,
            totalValue: balance.free,
          };
        }
        const tickerResponse =
          await this.binanceClient.getSymbolTickerPrice(symbol);

        const totalValue = this.calculateTotalSymbolValue(
          balance,
          tickerResponse,
        );
        return {
          asset: balance.asset,
          free: balance.free,
          locked: balance.locked,
          symbol: symbol,
          totalValue: totalValue ?? 'Unavailable',
        };
      }),
    );
  };

  private calculateTotalSymbolValue = (
    balance: BinanceBalance,
    tickerResponse: TickerPriceType,
  ) => {
    if (!tickerResponse) {
      return '';
    }
    const price = tickerResponse.price;
    const tokenAmount = balance.free;

    return (parseFloat(price) * parseFloat(tokenAmount)).toFixed(4);
  };
}
