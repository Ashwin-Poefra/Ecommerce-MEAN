import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/auth/login/login.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
// import { RouterModule, Route } from '@angular/router';
// export const usersRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, UsersRoutingModule,FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule],
    declarations: [LoginComponent],
})
export class UsersModule {}
