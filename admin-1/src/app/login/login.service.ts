import { Injectable } from '@angular/core';
import { HttpService } from '@core';
import { Manager } from '../interfaces/manager';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = '/login';
  constructor(private httpService: HttpService) {}
  login({username = '', password = ''}) {
    return this.httpService.post<Manager>(this.url, {username, password});
  }
  logout() {
    return this.httpService.post('/logout', {});
  }
}
