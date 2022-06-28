import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public isCategoryChecked = false;

    constructor(private _productService: ProductService, private _categoryService: CategoryService, private _activatedRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.checkCategoriesIdParams();
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

    public getFilteredProductList(selectedCategories: string[]) {
        this._productService
            .getFilteredProductByCategoryIds(selectedCategories)
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
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);

        if (selectedCategories === undefined || selectedCategories.length == 0) {
            this.getProductsList();
        } else {
            this.getFilteredProductList(selectedCategories as string[]);
        }
    }

    public checkCategoriesIdParams() {
        this._activatedRoute.params
        .pipe(takeUntil(this.endSubscription$))
        .subscribe((params) => {
            const categoryId = params['categoryId'];

            if (categoryId) {
                this._productService.getProductsByIdCategory(categoryId)
                .pipe(takeUntil(this.endSubscription$))
                .subscribe((response) => (this.products = response));
                this.isCategoryChecked = true;
            } else {
                this.getProductsList();
                this.isCategoryChecked = false;
            }
        });
    }
}
