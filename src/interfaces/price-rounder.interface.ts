export interface PriceRounder<T> {
  round: (amount: T) => T;
}
