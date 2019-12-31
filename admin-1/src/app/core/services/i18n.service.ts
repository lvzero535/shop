import { Injectable } from '@angular/core';
import ngZh from '@angular/common/locales/zh';
import ngEn from '@angular/common/locales/en';
import { zh_CN, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './setting.service';

interface Lang {
  text: string;
  ngLang: any;
  zorro: any;
}

const DEFAULT_LANG = 'zh-CN';
const LANGS: { [key: string]: Lang } = {
  'zh-CN': {
    text: '简体中文',
    zorro: zh_CN,
    ngLang: ngZh,
  },
  'en-US': {
    text: 'English',
    zorro: en_US,
    ngLang: ngEn,
  }
};
@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private langs: {code: string; text: string}[] = Object.keys(LANGS).map((code) => ({code, text: LANGS[code].text}));
  public defaultLang: string;
  constructor(private translate: TranslateService, private settingService: SettingService) {
    this.defaultLang = DEFAULT_LANG;
    this.updateLang(this.defaultLang);
  }
  private updateLang(lang: string) {
    const l = LANGS[lang];
    this.settingService.setI18n(l);
    registerLocaleData(l.ngLang);
    this.translate.use(lang);
  }
  use(lang: string) {
    lang = lang || this.translate.getDefaultLang();
    if (this.currentLang !== lang) {
      this.updateLang(lang);
    }
  }

  getLangs() {
    return this.langs;
  }
  get currentLang() {
    return this.translate.currentLang;
  }
}
