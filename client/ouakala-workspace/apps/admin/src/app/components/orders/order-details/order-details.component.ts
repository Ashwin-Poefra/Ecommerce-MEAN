import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '@ouakala-workspace/orders';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'admin-order-details',
    templateUrl: './order-details.component.html',
    styles: []
})
export class OrderDetailsComponent implements OnInit {
    public order: Order = new Order();
    constructor(
        private _orderService: OrderService,
        private _messageService: MessageService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
      this.getOrderDetails()
    }

    public getOrderDetails() {
        this._activatedRoute.params.subscribe((params) => {
            const orderId = params['orderId'];
            if (orderId) {
                this._orderService.getOrderById(orderId).subscribe((response) => {
                    this.order = response;
                });
            }
        });
    }
}
