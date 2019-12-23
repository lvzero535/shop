import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { SharedModule } from '@shared';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [ProductComponent, CreateComponent],
  imports: [
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
