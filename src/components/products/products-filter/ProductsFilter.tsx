import { Link } from "react-router-dom";
import useProductCategories from "../../../CustomHooks/ProductCategories";

const ProductFilter = ({ category, action }: { category: string | null, action: (category: string) => void }) => {
     const { categories } = useProductCategories();
    
 return  <div className="list-group sticky-top">
                <Link  style={{color: category ? '#212529' : '#FFFFFF'}} className={`list-group-item list-group-item-action text-decoration-none ${!category ? ' active' : ''}`} to="/">Todas las categorias</Link>
                {categories.map((productCategory: any) => <div style={{cursor: 'pointer'}} onClick={() => action(productCategory?.categoryName?.toLowerCase().replace(' ', ''))}  key={productCategory.id} className={`list-group-item list-group-item-action ${productCategory.categoryName.toLowerCase().replace(' ', '') === category ? ' active': ''}`}>{productCategory.categoryName}</div>)}
            </div>
}

export default ProductFilter;