

export class ShoppingCartItem {

  
    id?: string = '';
    title: string = '';
    productImage: any
    price: number = 0;
    quantity: number = 0;
    productId?: string = '';
    imageType: string = '';

    constructor(init?: Partial<ShoppingCartItem> ){
        Object.assign(this, init);
    }

    get totalPrice() { return this.price * this.quantity };
}
