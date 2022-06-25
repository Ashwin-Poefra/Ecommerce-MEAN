import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService } from '@ouakala-workspace/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
@Component({
    selector: 'admin-category-form',
    templateUrl: './category-form.component.html'
    // styles: []
})
export class CategoryFormComponent implements OnInit, OnDestroy {
    public category!: Category;
    public categoryForm!: FormGroup;
    public editMode = false;
    public showSpinner = false;
    public isSubmitted = false;

    public endSubscription$: Subject<void> = new Subject();

    constructor(
        private _categoryService: CategoryService,
        private _messageService: MessageService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.buildCategoryForm();
        this.checkEditMode();
    }

    ngOnDestroy(): void {
        this.endSubscription$.next();
        this.endSubscription$.complete();
    }

    private buildCategoryForm() {
        this.categoryForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required]),
            icon: new FormControl('', [Validators.required]),
            color: new FormControl('', [Validators.required])
        });
    }

    get categoryFromControls(): { [key: string]: AbstractControl } {
        return this.categoryForm.controls;
    }

    public onSubmit() {
        if (!this.editMode) {
            this.saveCategory();
        } else {
            this.updateCategory();
        }
    }

    private saveCategory() {
        this.isSubmitted = true;

        if (this.categoryForm.valid) {
            this.showSpinner = true;

            this.category = new Category();
            this.category.name = this.categoryFromControls['name'].value;
            this.category.icon = this.categoryFromControls['icon'].value;
            this.category.color = this.categoryFromControls['color'].value;

            this._categoryService
                .createCategory(this.category)
                .pipe(takeUntil(this.endSubscription$))
                .subscribe(
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
                        this.showSpinner = false;
                        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                    }
                );
        }
    }

    private updateCategory() {
        this.isSubmitted = true;

        if (this.categoryForm.valid) {
            this.showSpinner = true;

            this.category.name = this.categoryFromControls['name'].value;
            this.category.icon = this.categoryFromControls['icon'].value;
            this.category.color = this.categoryFromControls['color'].value;

            if (this.category.id) {
                this._categoryService
                    .updateCategory(this.category, this.category.id)
                    .pipe(takeUntil(this.endSubscription$))
                    .subscribe(
                        (response) => {
                            this.showSpinner = false;
                            this.isSubmitted = false;
                            this._messageService.add({
                                severity: 'success',
                                summary: 'Success',
                                detail: '(' + response.name + ') has ben updated successfully'
                            });
                            setTimeout(() => {
                                this._router.navigateByUrl('/categories');
                            }, 2000);
                        },
                        (error) => {
                            this.showSpinner = false;
                            this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                        }
                    );
            }
        }
    }

    private checkEditMode() {
        this._activatedRoute.params.subscribe((params) => {
            const categoryId = params['categoryId'];
            if (categoryId) {
                this.editMode = true;

                this._categoryService
                    .getCategoryById(categoryId)
                    .pipe(takeUntil(this.endSubscription$))
                    .subscribe((response) => {
                        this.category = response;
                        this.categoryFromControls['name'].setValue(this.category.name);
                        this.categoryFromControls['icon'].setValue(this.category.icon);
                        this.categoryFromControls['color'].setValue(this.category.color);
                    });
            }
        });
    }

    public onCancel() {
        this._location.back();
    }
}
