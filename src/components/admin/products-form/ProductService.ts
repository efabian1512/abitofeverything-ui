import { axiosInstance } from "../../../services/AxiosInstance";

export const saveProduct = (product: any, id?: string) => {
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

    if(!id)
        return axiosInstance.post('api/shop/products/save', formData);
   
        formData.append('id', id);
        return axiosInstance.put('api/shop/products/update', formData);
}

export const getProductCategories = () => {
 return axiosInstance.get('api/shop/categories');
}
export const getProducts = () => {
    return axiosInstance.get('api/shop/products')
}

export const getProductById = (id: string) => {
    return axiosInstance.get('api/shop/products/'+id);
}

export const deleteProductById = (id: string) => {
    return axiosInstance.delete('api/shop/products/delete/'+id);
}