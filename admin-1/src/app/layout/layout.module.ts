import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { DefaultComponent } from './default/default.component';
import { HeaderComponent } from './default/header/header.component';
import { SidebarComponent } from './default/sidebar/sidebar.component';
import { PassportComponent } from './passport/passport.component';
import { SettingComponent } from './default/header/components/setting.component';
import { UserComponent } from './default/header/components/user.component';
import { I18nComponent } from './default/header/components/i18n.component';



@NgModule({
  declarations: [
    DefaultComponent,
    HeaderComponent,
    SidebarComponent,
    PassportComponent,
    SettingComponent,
    UserComponent,
    I18nComponent
  ],
  imports: [
    SharedModule
  ]
})
export class LayoutModule {}
