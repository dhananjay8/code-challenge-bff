import { Checkout } from "@services/Checkout";
import { ProductInterface } from "@interfaces/Product";
import { DiscountInterface } from "@interfaces/Discount";

const products: ProductInterface[] = [
  { sku: "ipd", name: "Super iPad", price: 10 },
  { sku: "mbp", name: "MacBook Pro", price: 11 },
  { sku: "atv", name: "Apple TV", price: 13 },
  { sku: "vga", name: "VGA adapter", price: 14 },
];

const discounts: DiscountInterface[] = [
  {
    type: "bulk",
    sku: "ipd",
    threshold: 4,
    discountedPrice: 7,
  },
  {
    type: "bundle",
    sku: "atv",
    bundleSize: 3,
    priceForBundleItems: 2,
  },
];

describe("Checkout Service", () => {
  it("should calculate total for atv, atv, atv, vga", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("vga");
    expect(checkout.total()).toBe(40); // 2 * 13 + 14
  });

  it("should calculate total for atv, ipd, ipd, atv, ipd, ipd, ipd", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    expect(checkout.total()).toBe(61); // 2 * 13 + 5 * 7
  });

  it("should apply no discounts for single items", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("ipd");
    checkout.scan("mbp");
    expect(checkout.total()).toBe(21); // 10 + 11
  });

  it("should apply bulk discount for ipd when buying 5", () => {
    const checkout = new Checkout(products, discounts);
    for (let i = 0; i < 5; i++) {
      checkout.scan("ipd");
    }
    expect(checkout.total()).toBe(35); // 5 * 7
  });

  it("should apply Apple TV bundle discount correctly for 6 items", () => {
    const checkout = new Checkout(products, discounts);
    for (let i = 0; i < 6; i++) {
      checkout.scan("atv");
    }
    expect(checkout.total()).toBe(52); // 2 * (2 * 13)
  });

  it("should handle no items scanned", () => {
    const checkout = new Checkout(products, discounts);
    expect(checkout.total()).toBe(0); // No items scanned
  });

  it("should handle unknown SKUs gracefully", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("xyz"); // Invalid SKU
    checkout.scan("mbp");
    expect(checkout.total()).toBe(11);
  });

  it("should calculate correctly for a large mixed basket I", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("mbp");
    checkout.scan("atv");
    checkout.scan("vga");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("vga");
    expect(checkout.total()).toBe(105);
    // atv -> 3 = 2 * 13
    // ipd -> 4 = 4 * 10
    // mbp -> 11
    // VGA -> 2 * 14
    // 26 + 40 + 11 + 28
  });

  it("should calculate correctly for a large mixed basket II", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("atv");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("mbp");
    checkout.scan("atv");
    checkout.scan("vga");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("vga");
    checkout.scan("ipd");
    expect(checkout.total()).toBe(100);
    // atv -> 3 = 2 * 13
    // ipd -> 5 = 5 * 7
    // mbp -> 11
    // VGA -> 2 * 14
    // 26 + 35 + 11 + 28
  });

  it("should calculate correctly for a new large mixed basket scenario III", () => {
    const checkout = new Checkout(products, discounts);
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("ipd");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("atv");
    checkout.scan("mbp");
    checkout.scan("vga");
    checkout.scan("ipd");
    checkout.scan("mbp");
    checkout.scan("mbp");

    expect(checkout.total()).toBe(128);
    // atv -> 4 = 2 * 13 + 1 * 13
    // ipd -> 6 = 6 * 7
    // mbp -> 3 * 11
    // VGA -> 1 * 14
    // 39 + 42 + 33 + 14
  });
});
