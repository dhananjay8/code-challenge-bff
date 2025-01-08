import { Checkout } from "@services/Checkout";
import { ProductInterface } from "@interfaces/Product";
import { DiscountInterface } from "@interfaces/Discount";
import * as fs from "fs";
import * as path from "path";

const productsPath = path.resolve(__dirname, "../config/products.json");
const discountsPath = path.resolve(__dirname, "../config/discounts.json");

const products: ProductInterface[] = JSON.parse(
  fs.readFileSync(productsPath, "utf-8")
);
const discounts: DiscountInterface[] = JSON.parse(
  fs.readFileSync(discountsPath, "utf-8")
);

const checkout = new Checkout(products, discounts);

console.log("Starting checkout process...");

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

console.log(
  `Total price for the scanned items: $${checkout.total().toFixed(2)}`
);
