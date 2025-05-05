import { useEffect, useState } from "react";
import { useSearchParams, useLocation  } from "react-router-dom";
import useProductCategories from "../../../CustomHooks/useProductCategories";
import { sortCategories } from "../../../services/UtilsSetrvice";

// const ProductFilter = ({ category, action, navDropdown = false }: { category?: string | null, action?: (category: string) => void, navDropdown?: boolean }) => {
const ProductFilter = () => {
     const { categories } = useProductCategories();
     const [myParams, setMyParams] = useSearchParams();
     const [currentCategory, setCurrentCategory] = useState<string | null>('');

     const onCategoryChange = (category?: string) => {
       
         if(category) {
              setCurrentCategory(category);
             setMyParams({category});
         } else {
             myParams.delete('category');
             setMyParams(myParams);
             setCurrentCategory('');
         }
     }

     useEffect(() => {
        setCurrentCategory(myParams?.get('category') ? myParams?.get('category') : '')
     },[])

 return (<>
    <div onClick={() => onCategoryChange()} className={`dropdown-item clickable ${currentCategory === '' ? 'active border' : ''}`}>Todas las categorias</div>
    {categories?.sort(sortCategories)?.map((category: any) =>  <div key={category.id} onClick={() => onCategoryChange(category?.categoryName?.toLowerCase().replace(' ', ''))} className={`dropdown-item clickable ${category?.categoryName?.toLowerCase().replace(' ', '') === currentCategory ? 'active border' : ''}`}>{category.categoryName}</div>)}
 </>) 
//  <div className={`sticky-top mb-5 ${styles['specific-position']}`}>
//      <div className="list-group">
//                     <Link  style={{color: category ? '#212529' : '#FFFFFF'}} className={`list-group-item list-group-item-action text-decoration-none ${!category ? ' active' : ''}`} to="/">Todas las categorias</Link>
//                     {categories?.sort(sortCategories)?.map((productCategory: any) => <div style={{cursor: 'pointer'}} onClick={() => action(productCategory?.categoryName?.toLowerCase().replace(' ', ''))}  key={productCategory.id} className={`list-group-item list-group-item-action ${productCategory.categoryName.toLowerCase().replace(' ', '') === category ? ' active': ''}`}>{productCategory.categoryName}</div>)}
//                 </div>
//  </div>
}

export default ProductFilter;