import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: '', component: HomeComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: '/home/category' },
    { path: 'category', loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesModule) },
    { path: 'product', loadChildren: () => import('../products/product.module').then(m => m.ProductModule)},
    { path: 'manager', loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
