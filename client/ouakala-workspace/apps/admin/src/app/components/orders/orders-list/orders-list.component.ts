import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@ouakala-workspace/orders';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
import { ORDER_STATUS } from '../../../constants/order.status';


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
