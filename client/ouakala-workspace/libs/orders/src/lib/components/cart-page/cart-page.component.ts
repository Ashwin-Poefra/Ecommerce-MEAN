import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '@ouakala-workspace/products';
import { CartItemsDetailed } from '../../models/cartI-tems-detailed';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    public cartItemsDetailed: CartItemsDetailed[] = [];
    public cartCount = 0;
    public endSubscription$: Subject<void> = new Subject();

    constructor(private _router: Router, private _cartService: CartService, private _productService: ProductService) {}

    ngOnInit(): void {
        this.getCartDetails();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public OnBackToShop() {
        this._router.navigate(['/products']);
    }

    public onRemoveCartItem(cartItem: CartItemsDetailed) {
        this._cartService.deleteCartItem(cartItem.product?.id as string);
    }

    private getCartDetails() {
        this._cartService.cart$.pipe(takeUntil(this.endSubscription$)).subscribe((response) => {
            this.cartItemsDetailed = [];
            this.cartCount = response.items?.length ?? 0;
            response.items?.forEach((cartItem) => {
                this._productService.getProductById(cartItem.productId as string).subscribe((response) => {
                    this.cartItemsDetailed.push({
                        product: response,
                        quantity: cartItem.quantity
                    });
                });
            });
        });
    }

    public onUpdateCartItemQuantity(event: HTMLInputElement, cartItem: CartItemsDetailed) {
        this._cartService.setCartItem(
            {
                productId: cartItem.product?.id,
                quantity: +event.value
            },
            true
        );
    }
}
