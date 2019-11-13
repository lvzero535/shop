import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerService } from './manager.service';
import { ManagerComponent } from './manager/manager.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ModalComponent } from './modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManagerComponent, ModalComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [ManagerService],
  entryComponents: [ModalComponent]
})
export class ManagerModule { }
