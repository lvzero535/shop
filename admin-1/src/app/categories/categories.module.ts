import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryComponent } from './category/category.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { OneCategoryComponent } from './one-category/one-category.component';
import { TwoCategoryComponent } from './two-category/two-category.component';
import { CategoryService } from './category.service';
import { OneModalComponent } from './modal/one-modal/one-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecondCategoryService } from './second_category.service';
import { TwoModalComponent } from './modal/two-modal/two-modal.component';


@NgModule({
  declarations: [
    CategoryComponent,
    OneCategoryComponent,
    TwoCategoryComponent,
    OneModalComponent,
    TwoModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [CategoryService, SecondCategoryService],
  entryComponents: [
    OneModalComponent,
    TwoModalComponent
  ]
})
export class CategoriesModule { }
