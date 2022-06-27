import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [CommonModule,RouterModule,ButtonModule],
    exports: [ProductSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent],
    declarations: [ProductSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent]
})
export class ProductsModule {}
