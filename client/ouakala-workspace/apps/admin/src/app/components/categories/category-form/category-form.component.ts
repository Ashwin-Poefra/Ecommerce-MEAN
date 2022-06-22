import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService } from '@ouakala-workspace/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    selector: 'admin-category-form',
    templateUrl: './category-form.component.html'
    // styles: []
})
export class CategoryFormComponent implements OnInit {
    public category!: Category;
    public categoryForm!: FormGroup;
    public showSpinner = false;
    public isSubmitted = false;

    constructor(
        private _categoryService: CategoryService,
        private _messageService: MessageService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.buildCategoryForm();
    }

    private buildCategoryForm() {
        this.categoryForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required]),
            icon: new FormControl('', [Validators.required])
        });
    }

    get categoryFromControls(): { [key: string]: AbstractControl } {
        return this.categoryForm.controls;
    }

    public onSubmit() {
        this.saveCategory();
    }

    private saveCategory() {
        this.isSubmitted = true;

        if (this.categoryForm.valid) {
            this.showSpinner = true;

            this.category = new Category();
            this.category.name = this.categoryFromControls['name'].value;
            this.category.icon = this.categoryFromControls['icon'].value;

            this._categoryService.createCategory(this.category).subscribe(
                (response) => {
                    this.showSpinner = false;
                    this.isSubmitted = false;
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: '(' + response.name + ') has ben saved successfully'
                    });
                    setTimeout(() => {
                        this._router.navigateByUrl('/categories');
                    }, 2000);
                },
                (error) => {
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                }
            );
        }
    }

    public onCancel() {
        this._location.back();
    }
}
