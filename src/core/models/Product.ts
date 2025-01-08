import { IProduct } from "../interfaces/IProduct";

export class Product implements IProduct {
  constructor(public sku: string, public name: string, public price: number) {}
}
