import { ProductCategory } from "../models/ProductCategory";

 export const sortCategories = (a: ProductCategory, b: ProductCategory) => {
                if(a.categoryName > b.categoryName ) return 1;
                if(a.categoryName < b.categoryName ) return -1;
                return 0;
        }


export const sortByDateAsc = (object1: any, object2: any) => {
         if(object1.datePlaced > object2.datePlaced ) return 1;
         if(object1.datePlaced < object2.datePlaced ) return -1;
        return 0;
}

export const sortByDateDesc = (object1: any, object2: any) => {
         if(object1.datePlaced > object2.datePlaced ) return -1;
         if(object1.datePlaced < object2.datePlaced ) return 1;
        return 0;
}