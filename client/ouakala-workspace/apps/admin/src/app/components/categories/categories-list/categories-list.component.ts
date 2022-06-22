import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '@ouakala-workspace/products';
@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    public categories: Category[] = [];

    constructor(private _categoryService: CategoryService) {}

    ngOnInit(): void {
        this.getCategories();
    }

    public getCategories() {
        return this._categoryService.getCategories().subscribe((response) => {
            this.categories = response;
        });
    }
}
