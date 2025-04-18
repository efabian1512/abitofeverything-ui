import { Product } from "../models/Product";
import { ShoppingCartInfo } from "../models/ShoppingCartInfo";
import { ShoppingCartItem } from "../models/ShoppingCartItem";
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

const updateShoppingCartItem = (item: any, change: number)  => {
    return axiosInstance.put("/shop/items/update", {...item, quantity: item.quantity + change})
}

const addItemToCart = (item: any, cart: {[key: string]: string | number}, change: number) => {
    return axiosInstance.put("shop/shoppingcarts/addToCart", {dateCreated: cart?.dateCreated, item: {...item, quantity: change}, cartId: cart?.id} )
}

export const addToCartService  = async (product: Product) => {
    return updateItemQuantity(product, 1);
}

export const removeFromCartService = async (product: Product) => {
  return updateItemQuantity(product, -1);
}

export const getActualCart = (cart: ShoppingCartInfo) => {
    return new ShoppingCartInfo(cart.items, cart.id, cart.dateCreated);
}

const updateItemQuantity  = async (product: Product, change: number) => {
      let cart = await getCart();

    let itemInCart: ShoppingCartItem | undefined = cart.data.items.find((itemIncart: any) => itemIncart.productId === product.id);

    if (itemInCart) {
        const item = {id: itemInCart.id, quantity: itemInCart.quantity, product: product };
       return updateShoppingCartItem(item, change);
    } else {
        const item = {product: product};
       return addItemToCart(item, cart?.data, change)
    }
}