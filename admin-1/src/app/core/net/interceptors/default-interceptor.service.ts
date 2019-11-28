import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { environment } from '@env/environment';
import { NzNotificationService } from 'ng-zorro-antd';
import { catchError, mergeMap } from 'rxjs/operators';

const CODEMESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

@Injectable({
  providedIn: 'root'
})
export class DefaultInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private notification: NzNotificationService) { }

  private checkStatus(ev: HttpResponseBase) {
    if ((ev.status >= 200 && ev.status < 300) || ev.status === 401 || ev.status === 400) {
      return;
    }
    const errorText = CODEMESSAGE[ ev.status ] || ev.statusText;
    this.notification.error(`请求错误 ${ev.status}: ${ev.url}`, errorText);
  }
  private goTo(url) {
    setTimeout(() => this.router.navigateByUrl(url));
  }
  private handleData(ev: HttpResponseBase) {
    this.checkStatus(ev);
    switch (ev.status) {
      case 200:
        break;
      case 400:
          const error: any = (ev as HttpErrorResponse).error || {};
          this.notification.error(`异常提示 ${error.error_code}`, `${error.error_msg}`);
          break;
      case 401:
        this.notification.error(`未登录或登录已过期，请重新登录。`, ``);
        this.goTo('/passport');
        break;
      case 403:
      case 404:
      case 500:
        this.notification.warning('接口异常，请检查！', '');
        break;
      default:
        if (ev instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', ev);
          return throwError(ev);
        }
        break;
    }
    return of(ev);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://') && !url.includes('i18n')) {
      url = environment.URL + url;
    }
    const newReq = req.clone({
      url
    });
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
}
