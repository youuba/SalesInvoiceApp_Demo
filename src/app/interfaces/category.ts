import { Product } from "./product";

export interface Category {
    categoryID: number;
    categoryName: string;
    products?: Product[];
  }