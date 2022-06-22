import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoryService } from '@ouakala-workspace/products';
import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    public categories: Category[] = [];

    constructor(
        private _categoryService: CategoryService,
        private _messageService: MessageService,
        private _confirmationService: ConfirmationService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.getCategories();
    }

    public getCategories() {
        return this._categoryService.getCategories().subscribe((response) => {
            this.categories = response;
        });
    }

    onUpdateCategory(categoryId: string) {
        this._router.navigate(['/categories/category-from/', categoryId]);
    }

    onDeleteCategory(categoryId: string) {
        this._confirmationService.confirm({
            message: 'Are you sure that you want to perform this action?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this._categoryService.deleteCategory(categoryId).subscribe(
                    (response) => {
                        this.getCategories();
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Category has ben deleted successfully'
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
