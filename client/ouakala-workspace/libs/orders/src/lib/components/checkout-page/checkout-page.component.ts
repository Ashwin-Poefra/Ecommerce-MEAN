import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@ouakala-workspace/users';
import { ORDER_STATUS } from '../../constants/order.status';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    public orderItems?: OrderItem[] = [];
    public checkoutFormGroup!: FormGroup;
    public userId = '5f67be25ef4061637c13a11a';
    public isSubmitted = false;
    public countries: { id: string; name: string }[] = [];

    constructor(
        private _userService: UserService,
        private _cartService: CartService,
        private _orderService: OrderService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.initCheckoutForm();
        this.getCartItem();
        this.getCountries();
    }

    private initCheckoutForm() {
        this.checkoutFormGroup = this._formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: ['', Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private getCountries() {
        this.countries = this._userService.getCountries();
    }

    public backToCart() {
        this._router.navigate(['/cart']);
    }

    public getCartItem() {
        const cart: Cart = this._cartService.getCartItem();

        this.orderItems = cart.items?.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });

        console.log('bb  ' + JSON.stringify(this.orderItems));
    }

    placeOrder() {
        this.isSubmitted = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: Order = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm['street'].value,
            shippingAddress2: this.checkoutForm['apartment'].value,
            city: this.checkoutForm['city'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: 0,
            user: this.userId,
            dateOrdered: Date.now().toString()
        };

        this._orderService.saveOrder(order).subscribe((response) => {
          console.log("success");

        });
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
