import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AuthService } from '@core';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  constructor(private loginService: LoginService,
              private router: Router,
              private translate: TranslateService,
              private modalService: NzModalService,
              private notification: NzNotificationService,
              private authService: AuthService) { }

  ngOnInit() {
  }
  confirmLogout() {
    this.loginService.logout().subscribe(() => {
      this.authService.clearToken();
      this.notification.success('退出登录成功', '欢迎下次再来');
      this.router.navigate(['/login']);
    });
  }
  traggerI18n() {
    let lang = this.translate.currentLang;
    lang = lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    this.translate.use(lang);
  }
  logout() {
    const that = this;
    this.modalService.confirm({
      nzTitle: '提示',
      nzContent: '确认要退出登录吗？',
      nzOnOk() {
        that.confirmLogout();
      }
    });
  }
}
