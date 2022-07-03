import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { JwtInterceptor, UsersModule } from '@ouakala-workspace/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        ProductsModule,
        UiModule,
        OrdersModule,
        ToastModule,
        UsersModule
    ],
    providers: [MessageService, { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule {}
