import { ShoppingCartItem } from "./ShoppingCartItem";


export class ShoppingCartInfo {
    constructor(public items: ShoppingCartItem[], public id: string, public dateCreated: number) {
       this.items = this.items.map(item => {
           return new ShoppingCartItem(item);
       });
    }

    get totalPrice() {
        return this.items.reduce((accumulator, item) => accumulator + item.totalPrice, 0);
    }
    get totalItemsCount() {
        return this.items.reduce((accumulator, item) => accumulator + item.quantity, 0);
    }
}
