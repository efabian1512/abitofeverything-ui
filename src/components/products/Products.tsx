import './Product.css';
import ProductCard from '../card/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../admin/products-form/ProductService';
import { useSearchParams } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState<any>([]);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const [myParams, setMyParams] = useSearchParams();
    const [category, setCategory] = useState<string | null>(null);
  
    
    const applyFilter = () => {
        const query = myParams.get('category');
        setCategory(query);
        const filteredProductsLocal = query ? products.filter((product:any) => product?.category?.categoryName?.toLowerCase().replace(' ', '') === query) : products;
        setFilteredProducts(filteredProductsLocal);
    }

    const populateProducts = () => {
        getProducts().then((products) => {
            setProducts(products.data);
        }).catch((error) => error);
    }

    useEffect(() => {
        populateProducts();
    }, []);

    useEffect(() => {
        applyFilter()
    }, [myParams, products]);

 
    return <div>
        {/* <div className="row"> */}
        {/* <div style={{zIndex: 1019}} className="col-md-3 col-sm-3 col-lg-3">
           <ProductFilter category={category} action={handleFilter} />
        </div> */}
        {/* <div className="col-md col-lg col-sm"> */}
             <div className="abitof-products">
        {filteredProducts?.map((product: any) => <div key={product.id}>
            <ProductCard showActions={true} cardInfo={{ product: {...product, productImage: 'data:' + product.imageType+';base64,' + product.productImage}}}/>
        </div>)}
        {/* </div> */}
        </div>
    </div>
   
}

export default Products;