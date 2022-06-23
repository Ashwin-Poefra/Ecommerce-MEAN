import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService, Product, ProductService } from '@ouakala-workspace/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'product-form',
    templateUrl: './product-form.component.html',
    styles: []
})
export class ProductFormComponent implements OnInit {
    public product!: Product;
    public categories: Category[] = [];
    public productForm!: FormGroup;
    public editMode = false;
    public showSpinner = false;
    public isSubmitted = false;

    constructor(
        private _productService: ProductService,
        private _categoryService: CategoryService,
        private _messageService: MessageService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit(): void {
        this.buildProductForm();
        this.getCategories();
    }

    private buildProductForm() {
        this.productForm = this._formBuilder.group({
            name: new FormControl('', [Validators.required]),
            brand: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required]),
            category: new FormControl('', [Validators.required]),
            countInStock: new FormControl(0, [Validators.required]),
            description: new FormControl('', [Validators.required]),
            richDescription: new FormControl('', [Validators.required]),
            image: new FormControl('', [Validators.required]),
            isFeatured: new FormControl(false, [Validators.required])
        });
    }

    get productFromControls(): { [key: string]: AbstractControl } {
        return this.productForm.controls;
    }
    public getCategories() {
      return this._categoryService.getCategories().subscribe((response) => {
          this.categories = response;
      });
  }
    public onSubmit() {}
    public onCancel() {}
}
