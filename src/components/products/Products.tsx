import './Product.css';
import Card from '../card/Card';
import { useEffect, useState } from 'react';
import { getProducts } from '../admin/products-form/ProductService';

const Products = () => {

    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products.data);
        });
    }, []);


    return <div className="row">
        {products?.map((product: any) => <div className="col-md-4 col-sm-4 col-lg-4 mb-3" key={product.id}>
            <Card cardInfo={{ title: product.title, price: product.price, productImage: 'data:' + product.imageType+';base64,' + product.productImage, linkProperties: {desttination: '/shopping-cart', tag: 'Agregar al carrito' } }}/>
        </div>)}
        </div>
}

export default Products;