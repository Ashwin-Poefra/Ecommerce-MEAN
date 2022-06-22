import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { CategoryFormComponent } from './components/categories/category-form/category-form.component';

import { ConstantsRoutes } from './routes/constants-routes';

const routes: Routes = [
    {
        path: ConstantsRoutes.HOME,
        component: ShellComponent,
        children: [
            { path: ConstantsRoutes.DASHBOARD, component: DashboardComponent },
            { path: ConstantsRoutes.CATEGORIES, component: CategoriesListComponent },
            { path: ConstantsRoutes.CATEGORY_FORM_NEW, component: CategoryFormComponent },
            { path: ConstantsRoutes.CATEGORY_FORM_EDIT, component: CategoryFormComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
