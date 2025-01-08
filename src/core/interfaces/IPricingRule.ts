import { IDiscount } from "./IDiscount";

export interface IPricingRule {
  apply(
    items: Record<string, number>,
    prices: Record<string, number>,
    discount: IDiscount
  ): number;
}
