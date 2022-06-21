import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './components/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConstantsRoutes } from './routes/constants-routes';
import { ShellComponent } from './shared/shell/shell.component';

const routes: Routes = [
    {
        path: ConstantsRoutes.HOME,
        component: ShellComponent,
        children: [
            { path: ConstantsRoutes.DASHBOARD, component: DashboardComponent },
            { path: ConstantsRoutes.CATEGORIES, component: CategoriesListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
