import { ProductCategory } from "../models/ProductCategory";

 export const sortCategories = (a: ProductCategory, b: ProductCategory) => {
                if(a.categoryName > b.categoryName ) return 1;
                if(a.categoryName < b.categoryName ) return -1;
                return 0;
        }