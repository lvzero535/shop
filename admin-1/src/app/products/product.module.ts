import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CreateProductComponent } from './create-product/create-product.component';


@NgModule({
  declarations: [ProductComponent, CreateProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
})
export class ProductModule { }
