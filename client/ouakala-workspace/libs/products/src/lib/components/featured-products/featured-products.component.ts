import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
    public readonly PRODUCT_COUNT: number = 4;
    public products: Product[] = [];
    public endSubscription$ = new Subject<void>();

    constructor(private _productService: ProductService) {}

    ngOnInit(): void {
        this.getFeaturedProducts();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public getFeaturedProducts() {
        this._productService
            .getFeaturedProducts(this.PRODUCT_COUNT)
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((response) => {
                this.products = response;
            });
    }
}
