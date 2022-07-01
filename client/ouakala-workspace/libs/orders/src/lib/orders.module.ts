import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { OrdersRoutingModule } from './orders-routing.module';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    imports: [CommonModule, OrdersRoutingModule, BadgeModule, ButtonModule, InputNumberModule],
    declarations: [CartIconComponent, CartPageComponent],
    exports: [CartIconComponent, CartPageComponent]
})
export class OrdersModule {
    constructor(private _cartService: CartService) {
        this._cartService.initCartLocalStorage();
    }
}
