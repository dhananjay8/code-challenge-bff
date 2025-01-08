import { IPricingRule } from "../interfaces/IPricingRule";
import { IDiscount } from "../interfaces/IDiscount";

export class BundleDiscountRule implements IPricingRule {
  apply(
    items: Record<string, number>,
    prices: Record<string, number>,
    discount: IDiscount
  ): number {
    const count = items[discount.sku] || 0;
    const price = prices[discount.sku];
    const discountedCount =
      Math.floor(count / discount.bundleSize!) * discount.priceForBundle! +
      (count % discount.bundleSize!);
    return discountedCount * price;
  }
}
