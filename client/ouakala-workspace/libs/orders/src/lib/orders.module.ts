import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { OrdersRoutingModule } from './orders-routing.module';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, OrdersRoutingModule, BadgeModule, ButtonModule, InputNumberModule],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent],
    exports: [CartIconComponent, CartPageComponent]
})
export class OrdersModule {
    constructor(private _cartService: CartService) {
        this._cartService.initCartLocalStorage();
    }
}
