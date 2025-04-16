import { Product, ShoppingCartInfo, ShoppingCartItem } from "../models/Product";
import { axiosInstance } from "./AxiosInstance";


const createCart = () => {
    
    const formData = new FormData();
    formData.append('dateCreated', JSON.stringify(new Date().getTime()));

    return axiosInstance.post('/shop/shoppingcarts/create', formData);
}

export const getCart = async () => {
    let cartId = await getOrCreateCartId();
    return axiosInstance.get('/shop/shoppingcarts/'+cartId);
}

const getOrCreateCartId = async (): Promise<string> => {
      let cartId = localStorage.getItem('cartId');

   if(cartId) return cartId;

    let result = await createCart();
    localStorage.setItem('cartId', result.data)
    return result.data;

}

const updateShoppingCartItem = (item: ShoppingCartItem, change: number)  => {
    return axiosInstance.put("/shop/items/update", {...item, quantity: item.quantity + change})
}

const addItemToCart = (product: Product, cart: {[key: string]: string | number}, change: number) => {
    return axiosInstance.put("shop/shoppingcarts/addToCart", {dateCreated: cart?.dateCreated, item: {product: product, quantity: change}, cartId: cart?.id} )
}

export const addToCartService  = async (product: Product) => {
    return updateItemQuantity(product, 1);
}

export const removeFromCartService = async (product: Product) => {
  return updateItemQuantity(product, -1);
}

const updateItemQuantity  = async (product: Product, change: number) => {
      let cart = await getCart();

    let item = cart.data.items.find((item: any) => item.product.id === product.id);

    if (item) {
       return updateShoppingCartItem(item, change);
    } else {
       return addItemToCart(product, cart?.data, change)
    }
}