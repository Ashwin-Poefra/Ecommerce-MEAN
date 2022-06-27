import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    public categories: Category[] = [];
    public endSubscription$ = new Subject<void>();

    constructor(private _categoryService: CategoryService) {}

    ngOnInit(): void {
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    public getCategories() {
        this._categoryService
            .getCategories()
            .pipe(takeUntil(this.endSubscription$))
            .subscribe((response) => {
                this.categories = response;
            });
    }
}
