import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@ouakala-workspace/orders';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';

const ORDER_STATUS: any = {
    0: {
        label: 'Pending',
        color: 'primary'
    },
    1: {
        label: 'Processed',
        color: 'warning'
    },
    2: {
        label: 'Shipped',
        color: 'warning'
    },
    3: {
        label: 'Delivered',
        color: 'success'
    },
    4: {
        label: 'Failed',
        color: 'danger'
    }
};
@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    public orders: Order[] = [];
    public orderStatus = ORDER_STATUS;

    constructor(
        private _orderService: OrderService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getOrders();
    }

    public getOrders() {
        return this._orderService.getOrders().subscribe((response) => {
            this.orders = response;
        });
    }

    onShowOrder(orderId: string) {
        this._router.navigate(['/orders/order-details/', orderId]);
    }
    public onDeleteOrder(orderId: string) {}
}
