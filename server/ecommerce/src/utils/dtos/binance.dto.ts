import { z } from 'zod';

export const BinanceBalanceSchema = z.object({
  asset: z.string(),
  free: z.string(),
  locked: z.string(),
});

export const BinanceAccountInfoSchema = z.object({
  balances: z.array(BinanceBalanceSchema),
});

export type BinanceAccountInfo = z.infer<typeof BinanceAccountInfoSchema>;

export type BinanceBalanceWithTotalValueAndSymbol = {
  asset: string;
  free: string;
  locked: string;
  symbol: string;
  totalValue: string;
};

export type BinanceBalance = z.infer<typeof BinanceBalanceSchema>;

export type TickerPriceType = { [symbol: string]: string };

export type TickerPrice = {
  symbol: string;
  price: string;
};
