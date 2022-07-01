import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '@ouakala-workspace/products';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    public totalPrice = 0;
    public endSubscription$: Subject<void> = new Subject();

    constructor(private _cartService: CartService, private _productService: ProductService) {}

    ngOnInit(): void {
        this.onGetOrderSummary();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    onGetOrderSummary() {
        this._cartService.cart$.pipe(takeUntil(this.endSubscription$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items?.map((item) => {
                    this._productService
                        .getProductById(item.productId as string)
                        .pipe(take(1))
                        .subscribe((product) => {
                            if (item.quantity) this.totalPrice += ((product.price as number) * item.quantity) as number;
                        });
                });
            }
        });
    }
}
