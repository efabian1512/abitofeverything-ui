import { ShippingInfo } from "./ShippingInfo";
import { ShoppingCartInfo } from './ShoppingCartInfo';
import { User } from './User';

export class Order {
    datePlaced: number;
    items: any[] = [];

    constructor(public user: User | null, public shippingInfo: ShippingInfo, shoppingCart: ShoppingCartInfo | null) {
        this.datePlaced = new Date().getTime();

      this.items = shoppingCart ?  shoppingCart?.items.map(item => {
                return {
                   product: {id: item.productId, title: item.title, price: item.price},
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                }
            }) : [];
    }
}