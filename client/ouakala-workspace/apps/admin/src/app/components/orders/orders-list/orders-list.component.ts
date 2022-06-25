import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderService } from '@ouakala-workspace/orders';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ORDER_STATUS } from '../../../constants/order.status';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit , OnDestroy  {
    public orders: Order[] = [];
    public orderStatus = ORDER_STATUS;
    public endSubscription$: Subject<void> = new Subject();

    constructor(
        private _orderService: OrderService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getOrders();
    }

    ngOnDestroy(): void {
      this.endSubscription$.next();
      this.endSubscription$.complete();
  }

    public getOrders() {
        return this._orderService.getOrders().pipe(takeUntil(this.endSubscription$)).subscribe((response) => {
            this.orders = response;
        });
    }

    onShowOrder(orderId: string) {
        this._router.navigate(['/orders/order-details/', orderId]);
    }

    onDeleteOrder(orderId: string) {
        this._confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            header: 'Delete Order',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._orderService.deleteOrder(orderId)	.pipe(takeUntil(this.endSubscription$)).subscribe(
                    () => {
                        this.getOrders();
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Order has ben deleted successfully'
                        });
                    },
                    (error) => {
                        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                    }
                );
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this._messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                        break;
                }
            }
        });
    }
}
