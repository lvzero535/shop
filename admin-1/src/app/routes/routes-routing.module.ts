import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../layout/default/default.component';
import { PassportComponent } from '../layout/passport/passport.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'passport',
    component: PassportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
