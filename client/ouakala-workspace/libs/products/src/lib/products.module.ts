import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [ProductSearchComponent, CategoriesBannerComponent],
    declarations: [ProductSearchComponent, CategoriesBannerComponent]
})
export class ProductsModule {}
