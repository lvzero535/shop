import { Injectable } from '@angular/core';
const I18N = 'i18n';
const USER = 'user';
const APP = 'app';
@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private i18n: any;
  constructor() {
  }
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key) {
    return JSON.parse(localStorage.getItem(key) || 'null') || null;
  }
  setI18n(value) {
    this.set(I18N, value);
  }
  get getI18n() {
    if (!this.i18n) {
      this.i18n = this.get(I18N);
    }
    return this.i18n;
  }
}
