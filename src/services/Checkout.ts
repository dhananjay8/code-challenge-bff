import { IProduct } from "../core/interfaces/IProduct";
import { IDiscount } from "../core/interfaces/IDiscount";
import { PricingRuleService } from "./PricingRuleService";

export class Checkout {
  private items: Record<string, number> = {};
  private products: Record<string, number> = {};

  constructor(products: IProduct[], private discounts: IDiscount[]) {
    for (const product of products) {
      this.products[product.sku] = product.price;
    }
  }

  scan(sku: string): void {
    if (this.products[sku]) {
      this.items[sku] = (this.items[sku] || 0) + 1;
    } else {
      console.error(`Unknown SKU: ${sku}`);
    }
  }

  total(): number {
    const discountedItemTotalPrice = PricingRuleService.applyDiscounts(
      this.items,
      this.products,
      this.discounts
    );
    console.debug("discountedItemTotalPrice---", discountedItemTotalPrice);
    const regularItemTotalPrice = this.calculateRegularTotal();
    console.debug("regularItemTotalPrice---", regularItemTotalPrice);
    return discountedItemTotalPrice + regularItemTotalPrice;
  }

  private calculateRegularTotal(): number {
    let total = 0;

    for (const sku in this.items) {
      if (this.items.hasOwnProperty(sku)) {
        const count = this.items[sku];
        const hasDiscount = this.discounts.some((d) => d.sku === sku);
        if (!hasDiscount) {
          total += count * this.products[sku];
        }
      }
    }

    return total;
  }
}
