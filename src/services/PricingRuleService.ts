import { IDiscount } from "@interfaces/IDiscount";
import { PricingRuleFactory } from "../core/lib/PricingRuleFactory";

export class PricingRuleService {
  static applyDiscounts(
    items: Record<string, number>,
    prices: Record<string, number>,
    discounts: IDiscount[]
  ): number {
    let total = 0;

    for (const discount of discounts) {
      // console.log("discount---", discount);
      const rule = PricingRuleFactory.getRule(discount);
      // console.log("rule---", rule, items, prices, discount);
      total += rule.apply(items, prices, discount);
      // console.log("Inner total---", total);
    }
    // console.log("total---", total);

    return total;
  }
}
