import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, CategoryService, Product, ProductService } from '@ouakala-workspace/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-product-form',
    templateUrl: './product-form.component.html',
    styles: []
})
export class ProductFormComponent implements OnInit {
    public product!: Product;
    public currentProductId = '';
    public productForm!: FormGroup;
    public categories: Category[] = [];
    public editMode = false;
    public showSpinner = false;
    public isSubmitted = false;
    public imageDisplay!: string | ArrayBuffer | null;

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
        this.checkEditMode();
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

    onImageUpload(event: Event) {
        const file = (event.target as HTMLInputElement).files?.item(0);

        if (!file || !file.type.includes('image')) {
            return;
        }
        if (file) {
            this.productForm.patchValue({ image: file });
            this.productFromControls['image'].updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    public onSubmit() {
        if (!this.editMode) {
            this.saveProduct();
        } else {
            this.updateProduct();
        }
    }

    private saveProduct() {
        this.isSubmitted = true;
        if (this.productForm.invalid) return;

        if (this.productForm.valid) {
            const productFormData = new FormData();
            Object.keys(this.productFromControls).map((key) => {
                productFormData.append(key, this.productFromControls[key].value);
            });

            this._productService.createProduct(productFormData).subscribe(
                (response) => {
                    this.showSpinner = false;
                    this.isSubmitted = false;
                    this._messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: '(' + response.name + ') has ben saved successfully'
                    });
                    setTimeout(() => {
                        this._router.navigateByUrl('/products');
                    }, 2000);
                },
                (error) => {
                    this.showSpinner = false;
                    this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An Error occurred: ' + error });
                }
            );
        }
    }

    private updateProduct() {
        this.isSubmitted = true;

        if (this.productForm.valid) {
            this.showSpinner = true;

            const productFormData = new FormData();
            Object.keys(this.productFromControls).map((key) => {
                productFormData.append(key, this.productFromControls[key].value);
            });

            if (this.currentProductId) {
                this._productService.updateProduct(productFormData, this.currentProductId).subscribe(
                    (response) => {
                        this.showSpinner = false;
                        this.isSubmitted = false;
                        this._messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: '(' + response.name + ') has ben updated successfully'
                        });
                        setTimeout(() => {
                            this._router.navigateByUrl('/products');
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
            const productId = params['productId'];
            this.currentProductId = productId;
            console.log(this.currentProductId);

            if (productId) {
                this.editMode = true;

                this._productService.getProductById(productId).subscribe((response) => {
                    this.product = response;
                    this.productFromControls['name'].setValue(this.product.name);
                    this.productFromControls['brand'].setValue(this.product.brand);
                    this.productFromControls['price'].setValue(this.product.price);
                    this.productFromControls['category'].setValue(this.product.category?.id);
                    this.productFromControls['countInStock'].setValue(this.product.countInStock);
                    this.productFromControls['description'].setValue(this.product.description);
                    this.productFromControls['richDescription'].setValue(this.product.richDescription);
                    this.productFromControls['image'].setValue(this.product.image);
                    this.productFromControls['isFeatured'].setValue(this.product.isFeatured);
                    this.imageDisplay = this.product.image as string;
                    this.productFromControls['image'].setValidators([]);
                    this.productFromControls['image'].updateValueAndValidity();
                });
            }
        });
    }

    public onCancel() {
        this._location.back();
    }
}
