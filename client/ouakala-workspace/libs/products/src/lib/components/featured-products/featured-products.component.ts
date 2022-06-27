import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit {
    public products: Product[] = [];
    constructor() {}

    ngOnInit(): void {}
}
