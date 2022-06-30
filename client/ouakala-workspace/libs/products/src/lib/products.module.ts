import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';

import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@ouakala-workspace/ui';

const UX_MODULE = [ButtonModule, CheckboxModule, RatingModule, InputNumberModule];
@NgModule({
    imports: [CommonModule, ProductsRoutingModule, FormsModule,UiModule, ...UX_MODULE],
    exports: [
        ProductSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductDetailsComponent
    ],
    declarations: [
        ProductSearchComponent,
        CategoriesBannerComponent,
        ProductItemComponent,
        FeaturedProductsComponent,
        ProductsListComponent,
        ProductDetailsComponent
    ]
})
export class ProductsModule {}
