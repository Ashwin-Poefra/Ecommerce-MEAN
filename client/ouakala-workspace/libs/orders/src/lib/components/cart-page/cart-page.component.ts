import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit {
    constructor(private _router: Router) {}

    ngOnInit(): void {}

    public OnBackToShop() {
        this._router.navigate(['/products']);
    }

    public onRemoveCartItem(){
      console.log("clicked");

    }
}
