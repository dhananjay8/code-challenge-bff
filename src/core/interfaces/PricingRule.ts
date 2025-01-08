import { DiscountInterface } from "./Discount";

export interface PricingRuleInterface {
  apply(
    items: Record<string, number>,
    prices: Record<string, number>,
    discount: DiscountInterface
  ): number;
}
