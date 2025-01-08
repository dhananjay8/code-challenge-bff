import { IPricingRule } from "../interfaces/IPricingRule";
import { IDiscount } from "../interfaces/IDiscount";
import { BulkDiscountRule } from "./BulkDiscountRule";
import { BundleDiscountRule } from "./BundleDiscountRule";

export class PricingRuleFactory {
  static getRule(discount: IDiscount): IPricingRule {
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
