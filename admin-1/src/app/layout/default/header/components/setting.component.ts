import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'header-setting',
    template: `
        <div nz-dropdown [nzDropdownMenu]="settingMenu"
            nzTrigger="click"
            nzPlacement="bottomRight">
            <i nz-icon nzType="setting"></i>
        </div>
        <nz-dropdown-menu #settingMenu="nzDropdownMenu">
            <div nz-menu>
                <div nz-menu-item>
                    <i nz-icon nzType="bell" nzTheme="outline"></i>
                    事务通知
                </div>
                <div nz-menu-item>
                    <header-i18n></header-i18n>
                </div>
            </div>
        </nz-dropdown-menu>
    `
})
export class SettingComponent implements OnInit {

    constructor() {

    }
    ngOnInit() {

    }
}
