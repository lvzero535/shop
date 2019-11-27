import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { FirstCategoryComponent } from './first-category/first-category.component';
import { SecondCategoryComponent } from './second-category/second-category.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [FirstCategoryComponent, SecondCategoryComponent, CategoryComponent],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
