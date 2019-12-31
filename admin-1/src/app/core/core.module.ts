import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import.guard';
import { HttpInterceptorsProviders } from './net/interceptors';
import { I18nService } from './services/i18n.service';



@NgModule({
  providers: [
    HttpInterceptorsProviders,
    // I18nService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
