import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '@ouakala-workspace/products';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    public endSubscription$: Subject<void> = new Subject();

    constructor(
        private _productService: ProductService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public getProducts() {
        return this._productService.getProducts().pipe(takeUntil(this.endSubscription$))
        .subscribe((response) => {
            this.products = response;
        });
    }
    public onUpdateProduct(productId: string) {
        this._router.navigate(['/products/product-from/', productId]);
    }

    public onDeleteProduct(productId: string) {
        this._confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._productService.deleteProduct(productId).pipe(takeUntil(this.endSubscription$))
                .subscribe(
                    (response) => {
                        this.getProducts();
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Product has ben deleted successfully'
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
