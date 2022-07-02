import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@ouakala-workspace/users';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';

const routes: Routes = [
    { path: 'cart', component: CartPageComponent },
    { path: 'checkout', component: CheckoutPageComponent ,canActivate:[AuthGuard]},
    { path: 'success', component: ThankYouComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {}
