import { IDiscount } from "../interfaces/IDiscount";

export class Discount implements IDiscount {
  constructor(
    public type: string,
    public sku: string,
    public threshold?: number,
    public discountedPrice?: number,
    public bundleSize?: number,
    public priceForBundle?: number
  ) {}
}
