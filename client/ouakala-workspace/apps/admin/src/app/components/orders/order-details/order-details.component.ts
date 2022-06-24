import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '@ouakala-workspace/orders';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ORDER_STATUS } from '../../../constants/order.status';
@Component({
    selector: 'admin-order-details',
    templateUrl: './order-details.component.html',
    styles: []
})
export class OrderDetailsComponent implements OnInit {
    public order: Order = new Order();
    public orderStatus = ORDER_STATUS;
    public orderStatuses: { id: string; name: any }[] = [];
    public selectedStatus: any;

    constructor(
        private _orderService: OrderService,
        private _messageService: MessageService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.mapOrderStatus();
        this.getOrderDetails();
    }

    public getOrderDetails() {
        this._activatedRoute.params.subscribe((params) => {
            const orderId = params['orderId'];
            if (orderId) {
                this._orderService.getOrderById(orderId).subscribe((response) => {
                    this.order = response;
                    this.selectedStatus = this.order.status;
                });
            }
        });
    }

    public mapOrderStatus() {
        this.orderStatuses = Object.keys(this.orderStatus).map((key) => {
            return {
                id: key,
                name: this.orderStatus[key].label
            };
        });
    }

    public onStatusChange(event: any) {
        if (this.order.id) {
            this._orderService.updateOrder({ status: event.value }, this.order.id).subscribe(
                (response) => {
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Order has ben updated successfully'
                    });
                    setTimeout(() => {
                        this._router.navigateByUrl('/orders');
                    }, 2000);
                },
                (error) => {
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                }
            );
        }
    }

    public SubtotalPrice(price: number, quantity: number) {
        const subTotal = price * quantity;
        return subTotal;
    }

    public onCancel() {
        this._location.back();
    }
}
