import { ProductCategory } from "./ProductCategory";

export interface Product {
    id?: string;
    title: string;
    price: number;
    category: ProductCategory;
    productImage: any;
}


