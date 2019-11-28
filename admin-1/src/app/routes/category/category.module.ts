import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { FirstCategoryComponent } from './first-category/first-category.component';
import { SecondCategoryComponent } from './second-category/second-category.component';
import { CategoryComponent } from './category/category.component';
import { SharedModule } from '@shared';
import { FirstCategoryService } from './first-category.service';
import { SecondCategoryService } from './second-category.service';
import { FirstModalComponent } from './components/first-modal/first-modal.component';
import { SecondModalComponent } from './components/second-modal/second-modal.component';


@NgModule({
  declarations: [FirstCategoryComponent, SecondCategoryComponent, CategoryComponent, FirstModalComponent, SecondModalComponent],
  imports: [
    SharedModule,
    CategoryRoutingModule
  ],
  providers: [FirstCategoryService, SecondCategoryService],
  entryComponents: [FirstModalComponent, SecondModalComponent]
})
export class CategoryModule { }
