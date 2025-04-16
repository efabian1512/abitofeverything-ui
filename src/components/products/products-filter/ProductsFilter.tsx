import { Link } from "react-router-dom";
import useProductCategories from "../../../CustomHooks/ProductCategories";
import { sortCategories } from "../../../services/UtilsSetrvice";
import styles from './Product.module.css';

const ProductFilter = ({ category, action }: { category: string | null, action: (category: string) => void }) => {
     const { categories } = useProductCategories();
    
 return  <div className={`sticky-top ${styles['specific-position']}`}>
     <div className="list-group">
                    <Link  style={{color: category ? '#212529' : '#FFFFFF'}} className={`list-group-item list-group-item-action text-decoration-none ${!category ? ' active' : ''}`} to="/">Todas las categorias</Link>
                    {categories?.sort(sortCategories)?.map((productCategory: any) => <div style={{cursor: 'pointer'}} onClick={() => action(productCategory?.categoryName?.toLowerCase().replace(' ', ''))}  key={productCategory.id} className={`list-group-item list-group-item-action ${productCategory.categoryName.toLowerCase().replace(' ', '') === category ? ' active': ''}`}>{productCategory.categoryName}</div>)}
                </div>
 </div>
}

export default ProductFilter;