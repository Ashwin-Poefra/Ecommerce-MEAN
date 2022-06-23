import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '@ouakala-workspace/products';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    public products: Product[] = [];

    constructor(
        private _productservice: ProductService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getProducts();
    }

    public getProducts() {
        return this._productservice.getProducts().subscribe((response) => {
            this.products = response;
        });
    }
    public onUpdateProduct(productId: string) {}
    public onDeleteProduct(productId: string) {}
}
