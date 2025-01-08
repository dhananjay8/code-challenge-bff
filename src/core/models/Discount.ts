import { DiscountInterface } from "../interfaces/Discount";

export class Discount implements DiscountInterface {
  constructor(
    public type: string,
    public sku: string,
    public threshold?: number,
    public discountedPrice?: number,
    public bundleSize?: number,
    public priceForBundleItems?: number
  ) {}
}
