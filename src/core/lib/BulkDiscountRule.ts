import { IPricingRule } from "../interfaces/IPricingRule";
import { IDiscount } from "../interfaces/IDiscount";

export class BulkDiscountRule implements IPricingRule {
  apply(
    items: Record<string, number>,
    prices: Record<string, number>,
    discount: IDiscount
  ): number {
    const count = items[discount.sku] || 0;
    const price =
      count > (discount.threshold || 0)
        ? discount.discountedPrice!
        : prices[discount.sku];
    return count * price;
  }
}
