import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../layout/default/default.component';
import { PassportComponent } from '../layout/passport/passport.component';
import { SimpleGuardService } from '@core';


const routes: Routes = [
  {
    path: '',
    canActivate: [ SimpleGuardService ],
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'category', pathMatch: 'full'},
      { path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      }
    ]
  },
  {
    path: 'passport',
    component: PassportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }
