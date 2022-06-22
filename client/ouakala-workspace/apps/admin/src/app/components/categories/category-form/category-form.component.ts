import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService } from '@ouakala-workspace/products';
@Component({
    selector: 'admin-category-form',
    templateUrl: './category-form.component.html',
    styles: []
})
export class CategoryFormComponent implements OnInit {
    public category!: Category;
    public categoryForm!: FormGroup;
    public showSpinner = false;
    public isSubmitted = false;

    constructor(private _formBuilder: FormBuilder, private _categoryService: CategoryService) {}

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
        }
    }

    public onCancel() {}
}
