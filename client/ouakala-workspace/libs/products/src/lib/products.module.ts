import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
@NgModule({
    imports: [CommonModule],
    exports: [ProductSearchComponent],
    declarations: [ProductSearchComponent]
})
export class ProductsModule {}
