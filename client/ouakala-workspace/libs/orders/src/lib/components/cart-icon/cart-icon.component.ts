import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styles: []
})
export class CartIconComponent implements OnInit {
    public cartCount = 0;
    constructor(private _cartService: CartService) {}

    ngOnInit(): void {
        this.getTotalCartItems();
    }

    public getTotalCartItems() {
        this._cartService.cart$.subscribe((response) => {
            this.cartCount = response.items?.length as number;
        });
    }
}
