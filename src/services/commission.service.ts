import { PriceRounder } from '../interfaces/price-rounder.interface';
import { PriceSpread } from '../interfaces/price-spread.interface';
import { ServiceCommission } from './service-commission';
import { ConfigService } from './config.service';

export class CommissionService {
  private static priceRounder: PriceRounder<number> = {
    round: (x: number) => Math.floor(100000000 * x) / 100000000,
  };

  private static serviceCommission = new ServiceCommission(
    ConfigService.config.SERVICE_COMMISSION_PERCENT,
    this.priceRounder,
  );

  static applyToPriceSpread(priceSpread: PriceSpread): PriceSpread {
    return this.serviceCommission.applyCommissionToPriceSpread(priceSpread);
  }
}
