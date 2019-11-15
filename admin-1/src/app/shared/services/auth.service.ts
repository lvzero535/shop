import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key;
  constructor() { }

  getAuthToken() {
    return localStorage.getItem(this.key);
  }
  setToken(data: string, key?: string) {
    this.key = key || 'token';
    localStorage.setItem(this.key, data);
  }
}
