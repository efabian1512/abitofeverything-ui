export interface Product {
    id?: string;
    title: string;
    price: number;
    category: ProductCategory;
    productImage: any;
}

export interface ProductCategory {
    id: string;
    categoryName: string;
}

export interface ShoppingCartItem {
    product: Product,
    quantity: number;
}

export interface ShoppingCartInfo {
    id: string;
    items: ShoppingCartItem[];
    dateCreated: number;
}