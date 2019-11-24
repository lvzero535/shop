import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const COMPONENTS = [];
const DIRECTIVES = [];
const THIRDMODULES = [];

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
    TranslateModule,
    ...THIRDMODULES,
    ...COMPONENTS,
    ...DIRECTIVES
  ]
})
export class SharedModule { }
