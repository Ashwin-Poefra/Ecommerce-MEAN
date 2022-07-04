import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@ouakala-workspace/users';
import { Subject, take, takeUntil, timeout } from 'rxjs';
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
export class CheckoutPageComponent implements OnInit, OnDestroy {
    public orderItems?: OrderItem[] = [];
    public checkoutFormGroup!: FormGroup;
    public userId = '';
    public isSubmitted = false;
    public countries: { id: string; name: string }[] = [];
    public endSubscription$: Subject<void> = new Subject();

    constructor(
        private _userService: UserService,
        private _cartService: CartService,
        private _orderService: OrderService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.initCheckoutForm();
        this.autoFillUserData();
        this.getCartItem();
        this.getCountries();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
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

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
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

        this._orderService.setCacheOrderDate(order);
        //service removed from here to thank-you-page

        this._orderService.createCheckoutSession(this.orderItems as OrderItem[]).subscribe((error) => {
            if (error) {
                console.log('error in redirect to payment page.');
            }
        });
    }

    public autoFillUserData() {
        this._userService
            .observeCurrentUser()
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((response) => {
                this.userId = response?.id as string;
                this.checkoutForm['name'].setValue(response?.name);
                this.checkoutForm['email'].setValue(response?.email);
                this.checkoutForm['phone'].setValue(response?.phone);
                this.checkoutForm['city'].setValue(response?.city);
                this.checkoutForm['country'].setValue(response?.country);
                this.checkoutForm['zip'].setValue(response?.zip);
                this.checkoutForm['apartment'].setValue(response?.apartment);
                this.checkoutForm['street'].setValue(response?.street);
            });
    }
}
