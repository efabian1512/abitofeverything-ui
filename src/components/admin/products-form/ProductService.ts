
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5173',
  
  
});



export const saveProduct = (product: any) => {
    const formData = new FormData();
    formData.append('title', product?.title);
    formData.append('price', product?.price);
    formData.append('productImage', product.productImage);
    formData.append('category', JSON.stringify(product.category));
//     const config = {
//   headers: {
//     'Content-Type': 'text/plain',()
//     credentials: 'include',
//     'ACCESS-CONTROL-ALLOW-ORIGIN': '*',
//     'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS"
//   }
// };
    //message.isRead = false;

    return axiosInstance.post('api/shop/products/save', formData);
}

export const getProductCategories = () => {
 return axiosInstance.get('api/shop/categories');
}