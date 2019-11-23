import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SimpleGuardService implements CanActivate, CanActivateChild {

  private blackList = ['/home/manager'];

  constructor(private authService: AuthService, private notification: NzNotificationService) {}

  private checkRoute(url) {
    if (this.blackList.includes(url)) {
      const userInfo = JSON.parse(this.authService.getAuthToken());
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
