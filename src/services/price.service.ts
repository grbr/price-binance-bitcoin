import { ConfigService } from './config.service';
import { PriceSpread } from '../interfaces/price-spread.interface';
import { MidPrice } from '../interfaces/mid-price.interface';
import { Binance } from '../binance';

import { CommissionService } from './commission.service';

export class PriceService {
  private static binanceBitcoinPriceSpreadCacheTimer = setInterval(
    () => PriceService.binanceBitcoinPriceSpread(),
    ConfigService.config.UPDATE_INTERVAL_MILLIS,
  );

  private static cache = {
    binanceBitcoinPriceSpread: PriceService.binanceBitcoinPriceSpread(),
  };

  private static async binanceBitcoinPriceSpread(): Promise<(PriceSpread & MidPrice) | null> {
    const priceSpreadOrError = await Binance.priceSpread.bitcoin();
    if (priceSpreadOrError instanceof Error) {
      console.error(priceSpreadOrError);
      return Promise.resolve(null);
    } else {
      const priceSpread = CommissionService.applyToPriceSpread(priceSpreadOrError);
      const mid = (priceSpread.ask + priceSpread.bid) / 2;
      const result = { ...priceSpread, mid };
      this.cache.binanceBitcoinPriceSpread = Promise.resolve(result);
      return result;
    }
  }

  static async cachedBinanceBitcoinPriceSpread(): Promise<(PriceSpread & MidPrice) | null> {
    return this.cache.binanceBitcoinPriceSpread;
  }
}
