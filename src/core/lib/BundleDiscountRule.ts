import { PricingRuleInterface } from "../interfaces/PricingRule";
import { DiscountInterface } from "../interfaces/Discount";

export class BundleDiscountRule implements PricingRuleInterface {
  apply(
    items: Record<string, number>,
    prices: Record<string, number>,
    discount: DiscountInterface
  ): number {
    const count = items[discount.sku] || 0;
    const price = prices[discount.sku];
    const discountedCount =
      Math.floor(count / discount.bundleSize!) * discount.priceForBundleItems! +
      (count % discount.bundleSize!);
    return discountedCount * price;
  }
}
