import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PrimaryHeaderComponent } from './shared/primary-header/primary-header.component';
import { PrimaryFooterComponent } from './shared/primary-footer/primary-footer.component';
import { PrimaryNavbarComponent } from './shared/primary-navbar/primary-navbar.component';
import { UiModule } from '@ouakala-workspace/ui';
import { ProductsModule } from '@ouakala-workspace/products';
import { OrdersModule } from '@ouakala-workspace/orders';
import { ToastModule } from 'primeng/toast';
import { MessagesComponent } from './shared/messages/messages.component';
import { MessageService } from 'primeng/api';
@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        HomePageComponent,
        PrimaryHeaderComponent,
        PrimaryFooterComponent,
        PrimaryNavbarComponent,
        MessagesComponent
    ],
    imports: [BrowserModule,BrowserAnimationsModule, AppRoutingModule, HttpClientModule, ProductsModule, UiModule, OrdersModule, ToastModule],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
