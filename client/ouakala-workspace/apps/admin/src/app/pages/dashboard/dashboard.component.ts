import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from '@ouakala-workspace/orders';
import { ProductService } from '@ouakala-workspace/products';
import { UserService } from '@ouakala-workspace/users';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
    // styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    statistics: number[] = [];
    public endSubscription$: Subject<void> = new Subject();

    constructor(private _userService: UserService, private _productService: ProductService, private _ordersService: OrderService) {}

    ngOnInit(): void {
        this.getAllStatistics();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    private getAllStatistics() {
        combineLatest([
            this._userService.getUsersCount(),
            this._productService.getProductsCount(),
            this._ordersService.getOrdersCount(),
            this._ordersService.getTotalSales()
        ])
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((values) => {
                this.statistics = values;
            });
    }
}
