import { OnInit, Component } from '@angular/core';

@Component({
    selector: 'header-user',
    template: `
        <div nz-dropdown [nzDropdownMenu]="settingMenu"
            nzTrigger="hover"
            nzPlacement="bottomRight">
            <nz-avatar nzSrc="./assets/imgs/Koala.jpg" nzSize="small" ></nz-avatar>
            Admin
        </div>
        <nz-dropdown-menu #settingMenu="nzDropdownMenu">
            <div nz-menu>
                <div nz-menu-item>
                    <i nz-icon nzType="user"></i>
                    个人中心
                </div>
                <div nz-menu-item>
                    <i nz-icon nzType="setting"></i>
                    个人设置
                </div>
                <li nz-menu-divider></li>
                <div nz-menu-item (click)="logout()">
                    <i nz-icon nzType="logout" class="mr-sm"></i>
                    退出登录
                </div>
            </div>
        </nz-dropdown-menu>
    `
})
export class UserComponent implements OnInit {

    constructor() {}
    ngOnInit() {}
    logout() {
        alert('aa');
    }
}
