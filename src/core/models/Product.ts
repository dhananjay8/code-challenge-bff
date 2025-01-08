import { ProductInterface } from "../interfaces/Product";

export class Product implements ProductInterface {
  constructor(public sku: string, public name: string, public price: number) {}
}
