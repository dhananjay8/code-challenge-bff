import { PricingRuleInterface } from "../interfaces/PricingRule";
import { DiscountInterface } from "../interfaces/Discount";

export class BulkDiscountRule implements PricingRuleInterface {
  apply(
    items: Record<string, number>,
    prices: Record<string, number>,
    discount: DiscountInterface
  ): number {
    const count = items[discount.sku] || 0;
    const price =
      count > (discount.threshold || 0)
        ? discount.discountedPrice!
        : prices[discount.sku];
    return count * price;
  }
}
