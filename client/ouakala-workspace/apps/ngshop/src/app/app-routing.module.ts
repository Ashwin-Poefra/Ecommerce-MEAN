import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ConstantsRoutes } from './routes/constants-routes';

const routes: Routes = [
    { path: ConstantsRoutes.HOME, component: HomePageComponent },
    { path: ConstantsRoutes.PRODUCT_LIST, component: ProductListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
