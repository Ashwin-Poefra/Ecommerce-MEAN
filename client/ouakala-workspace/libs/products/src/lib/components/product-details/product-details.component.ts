import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Cart, CartItem, CartService } from '@ouakala-workspace/orders';

@Component({
    selector: 'products-product-details',
    templateUrl: './product-details.component.html',
    styles: []
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    public product: Product = new Product();
    public endSubscription$ = new Subject<void>();
    public isCategoryChecked = false;
    public quantity = 1;

    constructor(private _productService: ProductService, private _cartService: CartService, private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.getProduct();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public getProduct() {
        this._activatedRoute.params.pipe(takeUntil(this.endSubscription$)).subscribe((params) => {
            const productId = params['productId'];
            if (productId) {
                this._productService
                    .getProductById(productId)
                    .pipe(takeUntil(this.endSubscription$))
                    .subscribe((response) => {
                        this.product = response;
                    });
            }
        });
    }

    public addProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        this._cartService.setCartItem(cartItem);
    }
}
