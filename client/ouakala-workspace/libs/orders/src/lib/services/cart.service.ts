import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart-item';

const CART_KEY = 'cart';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCartItem());

    constructor() {}

    public initCartLocalStorage() {
        const cart: Cart = this.getCartItem();
        if (!cart) {
            const initialCartItem = {
                items: []
            };
            localStorage.setItem(CART_KEY, JSON.stringify(initialCartItem));
        }
    }

    public getCartItem(): Cart {
        const cartJsonString: string = localStorage.getItem(CART_KEY) || 'null';
        const cart: Cart = JSON.parse(cartJsonString);
        return cart;
    }

    public setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
        const cart: Cart = this.getCartItem();
        const cartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);

        if (cartItemExist) {
            cart.items?.map((item) => {
                if (item.quantity !== undefined && cartItem.quantity !== undefined) {
                    if (item.productId === cartItem.productId) {
                        if (updateCartItem) {
                            item.quantity = cartItem.quantity;
                        } else {
                            item.quantity = item.quantity + cartItem.quantity;
                        }
                    }
                }
            });
        } else {
            cart.items?.push(cartItem);
        }
        this.cart$.next(cart);
        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJson);
        return cart;
    }

    deleteCartItem(productId: string) {
        const cart: Cart = this.getCartItem();
        const newCart = cart.items?.filter((item) => item.productId !== productId);
        cart.items = newCart;
        const cartJsonString = JSON.stringify(cart);
        localStorage.setItem(CART_KEY, cartJsonString);
        this.cart$.next(cart);
    }
}
