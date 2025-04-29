import { ShippingInfo } from "./ShippingInfo";
import { ShoppingCartInfo } from './ShoppingCartInfo';
import { User } from './User';

export class Order {
    datePlaced: number;
    items: any[] = [];
    total: number = 0;
    paymentId: string | null;

    constructor(public user: User | null, public shippingInfo: ShippingInfo | null, shoppingCart: ShoppingCartInfo | null, paymentId: string | null) {
        this.datePlaced = new Date().getTime();
        this.paymentId = paymentId;

      this.items = shoppingCart ?  shoppingCart?.items.map(item => {
                return {
                   product: {id: item.productId, title: item.title, price: item.price},
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                }
            }) : [];
     this.total = shoppingCart?.totalPrice ? shoppingCart?.totalPrice : 0;
    }
}