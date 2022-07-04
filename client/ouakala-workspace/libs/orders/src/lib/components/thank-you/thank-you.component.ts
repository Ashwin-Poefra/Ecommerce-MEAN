import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'orders-thank-you',
    templateUrl: './thank-you.component.html',
    styles: []
})
export class ThankYouComponent implements OnInit {
    constructor(private _orderService: OrderService, private _cartService: CartService, private _router: Router) {}

    ngOnInit(): void {
        this.placingOrder();
    }

    private placingOrder() {
        const orderData = this._orderService.getCacheOrderDate();
        this._orderService.saveOrder(orderData).subscribe((response) => {
            setTimeout(() => {
                this._cartService.emptyCart();
                this._orderService.removeCacheOrderDate();
                this._router.navigate(['/']);
            }, 5000);
        });
    }
}
