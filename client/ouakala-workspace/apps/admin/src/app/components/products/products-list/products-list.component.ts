import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    public products: string[] = [];

    constructor() {}

    ngOnInit(): void {}

    public onUpdateProduct(productId: string){};
    public onDeleteProduct(productId: string){};
}
