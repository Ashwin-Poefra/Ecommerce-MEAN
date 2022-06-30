import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    constructor() {}

    public initCartLocalStorage() {
        const initialCartItem = {
            items: []
        };

        localStorage.setItem('cart', JSON.stringify(initialCartItem));
    }
}
