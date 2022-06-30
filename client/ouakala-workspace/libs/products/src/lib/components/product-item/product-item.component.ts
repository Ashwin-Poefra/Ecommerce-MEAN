import { Component, Input, OnInit } from '@angular/core';
import { CartItem, CartService } from '@ouakala-workspace/orders';
import { Product } from '../../models/product';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() public product: Product = new Product();
    constructor(private _cartService: CartService) {}

    ngOnInit(): void {}

    public OnAddProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: 1
        };
        this._cartService.setCartItem(cartItem);
    }
}
