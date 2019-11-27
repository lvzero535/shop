import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

const COMPONENTS = [];
const DIRECTIVES = [];
const THIRDMODULES = [ NgZorroAntdModule, TranslateModule ];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  imports: [
    CommonModule,
    ...THIRDMODULES
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...THIRDMODULES,
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
