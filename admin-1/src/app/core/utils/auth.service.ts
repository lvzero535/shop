import { Injectable } from '@angular/core';
import { HttpService } from '@core/net/http/http.service';
import { Manager } from 'src/app/interfaces/manager';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key;
  private url = '/login';
  constructor(private httpService: HttpService) { }

  getAuthToken() {
    return localStorage.getItem(this.key || 'token');
  }
  setToken(data: string, key?: string) {
    this.key = key || 'token';
    localStorage.setItem(this.key, data);
  }
  clearToken() {
    localStorage.removeItem(this.key);
  }
  login({username = '', password = ''}) {
    return this.httpService.post<Manager>(this.url, {username, password});
  }
  logout() {
    return this.httpService.post('/logout', {});
  }
}
