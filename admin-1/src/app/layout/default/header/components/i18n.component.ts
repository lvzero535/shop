import { Component, OnInit } from '@angular/core';
import { I18nService } from '@core';

@Component({
  selector: 'header-i18n',
  template: `
    <div nz-dropdown [nzDropdownMenu]="i18nMenu"
            nzTrigger="hover"
            nzPlacement="topRight">
            <i nz-icon nzType="global" nzTheme="outline"></i>
            语言切换
        </div>
        <nz-dropdown-menu #i18nMenu="nzDropdownMenu">
            <div nz-menu>
                <div nz-menu-item (click)="toggerI18n(lang.code)" *ngFor="let lang of langs">
                    {{lang.text}}
                </div>
            </div>
        </nz-dropdown-menu>
  `,
})
export class I18nComponent implements OnInit {

  public langs: Array<any>;
  constructor(private i18n: I18nService) { }

  ngOnInit() {
    this.langs = this.i18n.getLangs();
  }
  toggerI18n(code: string) {
    this.i18n.use(code);
  }
}
