import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http/http.service';
import { AppConfig } from '../AppConfig';
import { Manager } from '../interfaces/manager';

@Injectable()
export class LoginService {

  private url;
  constructor(private httpService: HttpService,
              private appConfig: AppConfig) {
                this.url = `${this.appConfig.URL}/login`;
  }
  login({username = '', password = ''}) {
    return this.httpService.post<Manager>(this.url, {username, password});
  }
}
