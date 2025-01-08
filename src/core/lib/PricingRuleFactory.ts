import { PricingRuleInterface } from "../interfaces/PricingRule";
import { DiscountInterface } from "../interfaces/Discount";
import { BulkDiscountRule } from "./BulkDiscountRule";
import { BundleDiscountRule } from "./BundleDiscountRule";

export class PricingRuleFactory {
  static getRule(discount: DiscountInterface): PricingRuleInterface {
    switch (discount.type) {
      case "bulk":
        return new BulkDiscountRule();
      case "bundle":
        return new BundleDiscountRule();
      default:
        throw new Error(`Unknown discount type: ${discount.type}`);
    }
  }
}
