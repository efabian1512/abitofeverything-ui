import { Product } from "./Product";
import { ShoppingCartItem } from "./ShoppingCartItem";


export class ShoppingCartInfo {
    constructor(public items: ShoppingCartItem[], public id: string, public dateCreated: number) {
       this.items = this.items.map(item => new ShoppingCartItem(item.id, item.product, item.quantity));
    }

    getQuantity(product: Product){
        console.log('executing');
        const item = this.items?.find(item => item.product.id === product?.id);
        return item ? item.quantity : 0; 
    }

    get totalPrice() {
        return this.items.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
    }
    get totalItemsCount() {
        return this.items.reduce((accumulator, item) => accumulator + item.quantity, 0);
    }
}
