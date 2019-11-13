import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';


const routes: Routes = [
  { path: 'create', component: CreateProductComponent},
  { path: '', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
