import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { Product } from '../../models/product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {
    public products: Product[] = [];
    public categories: Category[] = [];
    public endSubscription$ = new Subject<void>();

    constructor(private _productService: ProductService, private _categoryService: CategoryService) {}

    ngOnInit(): void {
        this.getProductsList();
        this.getCategoriesList();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public getProductsList() {
        this._productService
            .getProducts()
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((response) => {
                this.products = response;
            });
    }

    public getCategoriesList() {
        this._categoryService
            .getCategories()
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((response) => {
                this.categories = response;
            });
    }

    public onCategoryFilter() {
        const selectedCategories:any = this.categories.filter((category) => category.checked).map((category) => category.id);

        this._productService.getFilteredProductByCategoryIds(selectedCategories).subscribe((response) => {
            this.products = response;
        });
    }
}
