import { PriceSpread } from '../interfaces/price-spread.interface';
import { apiGetRequest, Endpoints, Symbols } from './binance-api';

export class Binance {
  private static async symbolOrderBookTicker(symbol: string): Promise<PriceSpread | Error> {
    try {
      const data = await apiGetRequest(Endpoints.PRICE_SPREAD_ENDPOINT, { symbol });
      const { askPrice, bidPrice } = JSON.parse(data) as {
        bidPrice: number;
        askPrice: number;
      };
      return { ask: askPrice, bid: bidPrice };
    } catch (error: unknown) {
      return error as Error;
    }
  }

  static priceSpread = {
    async bitcoin(): Promise<PriceSpread | Error> {
      return Binance.symbolOrderBookTicker(Symbols.BTCUSDT);
    },
  };
}
