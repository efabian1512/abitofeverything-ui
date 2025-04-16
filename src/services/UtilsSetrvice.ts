import { ProductCategory } from "../models/Product";

 export const sortCategories = (a: ProductCategory, b: ProductCategory) => {
                if(a.categoryName > b.categoryName ) return 1;
                if(a.categoryName < b.categoryName ) return -1;
                return 0;
        }