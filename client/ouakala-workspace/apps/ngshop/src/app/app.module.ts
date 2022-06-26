import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { PrimaryHeaderComponent } from './shared/primary-header/primary-header.component';
import { PrimaryFooterComponent } from './shared/primary-footer/primary-footer.component';
import { UiModule } from '@ouakala-workspace/ui';
import { PrimaryNavbarComponent } from './shared/primary-navbar/primary-navbar.component';
@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, HomePageComponent, ProductListComponent, PrimaryHeaderComponent, PrimaryFooterComponent, PrimaryNavbarComponent],
    imports: [BrowserModule, AppRoutingModule, UiModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
