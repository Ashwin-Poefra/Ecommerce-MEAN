import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '@ouakala-workspace/products';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit {
    constructor(private _router: Router, private _cartService: CartService, private _productService: ProductService) {}

    ngOnInit(): void {
        this.getCartDetails();
    }

    public OnBackToShop() {
        this._router.navigate(['/products']);
    }

    public onRemoveCartItem() {
        console.log('clicked');
    }

    private getCartDetails() {
        this._cartService.cart$.pipe().subscribe((response) => {
            response.items?.forEach((cartItem) => {
                this._productService.getProductById(cartItem.productId as string).subscribe(
                  (response)=>{
                    console.log(response);

                  }
                )
            });
        });
    }
}
