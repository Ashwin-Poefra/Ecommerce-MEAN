import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';
import { ProductsListComponent } from './components/products/products-list/products-list.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { OrdersListComponent } from './components/orders/orders-list/orders-list.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    ColorPickerModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    ImageModule,
    InputNumberModule,
    InputSwitchModule,
    InputTextareaModule,
    DropdownModule,
    EditorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
];
@NgModule({
    declarations: [
        AppComponent,
        NxWelcomeComponent,
        ShellComponent,
        SidebarComponent,
        DashboardComponent,
        CategoriesListComponent,
        CategoryFormComponent,
        ProductsListComponent,
        ProductFormComponent,
        UsersListComponent,
        UserFormComponent,
        OrdersListComponent,
        OrderDetailsComponent
    ],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, ...UX_MODULE],
    providers: [MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
