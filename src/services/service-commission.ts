import { PriceRounder } from '../interfaces/price-rounder.interface';
import { PriceSpread } from '../interfaces/price-spread.interface';

export class ServiceCommission {
  private _commissionRate: number;
  private _priceRounder?: PriceRounder<number>;

  constructor(commissionRate: number, priceRounder?: PriceRounder<number>) {
    this._commissionRate = commissionRate;
    this._priceRounder = priceRounder;
  }

  private applyCommissionToNumber(amount: number): number {
    const value = amount * (1 + this._commissionRate / 100);
    return this._priceRounder ? this._priceRounder.round(value) : value;
  }

  applyCommissionToPriceSpread(priceSpread: PriceSpread): PriceSpread {
    return {
      ask: this.applyCommissionToNumber(priceSpread.ask),
      bid: this.applyCommissionToNumber(priceSpread.bid),
    };
  }
}
