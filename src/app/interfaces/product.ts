import { Category } from "./category";

export interface Product {
    productID: number;
    productName: string;
    unitPrice: number;
    stockQuantity: number;
    category: Category;
  }