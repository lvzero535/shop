import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http/http.service';
import { Manager } from '../interfaces/manager';

@Injectable()
export class LoginService {

  private url = '/login';
  constructor(private httpService: HttpService) {}
  login({username = '', password = ''}) {
    return this.httpService.post<Manager>(this.url, {username, password});
  }
}
