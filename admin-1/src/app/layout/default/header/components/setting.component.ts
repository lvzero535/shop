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
                <div nz-menu-item>事务通知</div>
                <div nz-menu-item>语言切换</div>
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
