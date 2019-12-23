import { NgModule } from '@angular/core';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerService } from './manager.service';
import { ManagerComponent } from './manager/manager.component';
import { CreateComponent } from './components/create/create.component';
import { SharedModule } from '@shared';


@NgModule({
  declarations: [ManagerComponent, CreateComponent],
  imports: [
    SharedModule,
    ManagerRoutingModule
  ],
  providers: [ManagerService],
  entryComponents: [CreateComponent]
})
export class ManagerModule { }
