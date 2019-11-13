import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http/http.service';
import { AppConfig } from '../AppConfig';
import { SecondCategoryResp, SecondCategory } from '../interfaces/second_category';

@Injectable()
export class SecondCategoryService {
  private uri = '/secondcategories';
  constructor(private httpServcie: HttpService, private appConfig: AppConfig) { }

  getTwoCategory(parmas, name?: string, categoryId?: string) {
    const querys = Object.assign({}, parmas);
    if (categoryId) {
      querys.categoryId = categoryId;
    }
    if (name) {
      querys.name = name;
    }
    const url = `${this.appConfig.URL}${this.uri}`;
    return this.httpServcie.get<SecondCategoryResp>(url, querys);
  }
  getTwoCategoryByName(name: string) {
    const url = `${this.appConfig.URL}${this.uri}/name/${name}`;
    return this.httpServcie.get<SecondCategory>(url);
  }
  addTwoCategory(body: SecondCategory) {
    const url = `${this.appConfig.URL}${this.uri}`;
    return this.httpServcie.post<SecondCategory>(url, body);
  }
  editTwoCategory(id: string, body: SecondCategory) {
    const url = `${this.appConfig.URL}${this.uri}/${id}`;
    return this.httpServcie.put<SecondCategory>(url, body);
  }
  deleteTwoCategory(id: string) {
    const url = `${this.appConfig.URL}${this.uri}/${id}`;
    return this.httpServcie.delete(url);
  }
}
