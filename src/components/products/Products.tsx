import './Product.css';
import ProductCard from '../card/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../admin/products-form/ProductService';
import { useSearchParams } from 'react-router-dom';

const Products = () => {

    const [products, setProducts] = useState<any>([]);
    const [filteredProducts, setFilteredProducts] = useState<any>([]);
    const [myParams] = useSearchParams();
  
    //  const handleFilter = (category: string) => {
    //      setMyParams({category});
    //   }

    const applyFilters = () => {

        let filteredProductsLocal  = products;

        if(myParams.get('category')) {
            const query = myParams.get('category');
           filteredProductsLocal = query ? filteredProductsLocal.filter((product:any) => product?.category?.categoryName?.toLowerCase().replace(' ', '') === query) : filteredProductsLocal;
        }

        if(myParams.get('desde')) {
            const query = myParams.get('desde');

            filteredProductsLocal = query ? filteredProductsLocal.filter((product:any) => product?.price >= parseFloat(query)) : filteredProductsLocal;
        }

        if(myParams.get('hasta')) {
            const query = myParams.get('hasta');

            filteredProductsLocal = query ? filteredProductsLocal.filter((product:any) => product?.price <= parseFloat(query)) : filteredProductsLocal;
        }

        // const query = myParams.get('category');
        // filteredProductsLocal = query ? products.filter((product:any) => product?.category?.categoryName?.toLowerCase().replace(' ', '') === query) : products;
        setFilteredProducts(filteredProductsLocal);
    }

    // const getFilteredProducts = (productsLocal: any[], query: string, valueProperty: string) => {

    //     if(valueProperty?.toLowerCase() === 'desde') {

    //     }
    //     query ? productsLocal.filter((product:any) => product?.category?.categoryName?.toLowerCase().replace(' ', '') === query) : products;
    // }

    const populateProducts = () => {
        getProducts().then((resp) => {
            setProducts(resp.data);
        }).catch((error) => error);
    }

    useEffect(() => {
        populateProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [myParams, products]);

 
    // return <div className="row">
        {/* <div style={{zIndex: 1019}} className="col-md-3 col-sm-3 col-lg-3">
           <ProductFilter category={category} action={handleFilter} />
        </div> */}
        {/* <div className="col-md col-lg col-sm"> */}
           return  <div className="abitof-products">
        {filteredProducts?.map((product: any) => <div key={product.id}>
            <ProductCard showActions={true} cardInfo={{ product: {...product, productImage: 'data:' + product.imageType+';base64,' + product.productImage}}}/>
        </div>)}
        {/* </div> */}
        </div>
    // </div>
   
}

export default Products;