import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../utils/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SimpleGuardService implements CanActivate, CanActivateChild {

  private blackList = ['/manager'];

  constructor(private authService: AuthService, private router: Router, private notification: NzNotificationService) {}

  private isLogin(user: any, url: string) {
    if (!user) {
      this.notification.warning('登录提示', '你还没登录，请先登录！');
      this.authService.redirectUrl = url;
      this.router.navigateByUrl('/passport');
      return false;
    }
    return true;
  }
  private checkRoute(url) {
    const userInfo = JSON.parse(this.authService.getAuthToken());
    const isLogin = this.isLogin(userInfo, url);
    if (!isLogin) {
      return false;
    }
    if (this.blackList.includes(url)) {
      if (userInfo.role !== 'admin') {
        this.notification.warning('权限异常提示', '该模块您没有权限，请先申请权限');
        return false;
      }
    }
    return true;
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    return this.checkRoute(url);
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }

}
