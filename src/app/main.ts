import { Checkout } from "@services/Checkout";
import { IProduct } from "@interfaces/IProduct";
import { IDiscount } from "@interfaces/IDiscount";
import * as fs from "fs";
import * as path from "path";

const productsPath = path.resolve(__dirname, "../config/products.json");
const discountsPath = path.resolve(__dirname, "../config/discounts.json");

const products: IProduct[] = JSON.parse(fs.readFileSync(productsPath, "utf-8"));
const discounts: IDiscount[] = JSON.parse(
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

// atv -> 4 = 2 * 13 + 1 * 13
// ipd -> 6 = 6 * 7
// mbp -> 3 * 11
// VGA -> 1 * 14
// 39 + 42 + 33 + 14

console.log(
  `Total price for the scanned items: $${checkout.total().toFixed(2)}`
);
