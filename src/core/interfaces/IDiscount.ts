export interface IDiscount {
  type: string;
  sku: string;
  threshold?: number;
  discountedPrice?: number;
  bundleSize?: number;
  priceForBundle?: number;
}
