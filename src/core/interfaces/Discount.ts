export interface DiscountInterface {
  type: string;
  sku: string;
  threshold?: number;
  discountedPrice?: number;
  bundleSize?: number;
  priceForBundleItems?: number;
}
