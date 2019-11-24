import { Injectable } from '@angular/core';
import { HttpService } from '@core';
import { SecondCategoryResp, SecondCategory } from '../interfaces/second_category';

@Injectable()
export class SecondCategoryService {
  private uri = '/secondcategories';
  constructor(private httpServcie: HttpService) { }

  getTwoCategory(parmas, name?: string, categoryId?: string) {
    const querys = Object.assign({}, parmas);
    if (categoryId) {
      querys.categoryId = categoryId;
    }
    if (name) {
      querys.name = name;
    }
    const url = `${this.uri}`;
    return this.httpServcie.get<SecondCategoryResp>(url, querys);
  }
  getTwoCategoryByName(name: string) {
    const url = `${this.uri}/name/${name}`;
    return this.httpServcie.get<SecondCategory>(url);
  }
  addTwoCategory(body: SecondCategory) {
    const url = `${this.uri}`;
    return this.httpServcie.post<SecondCategory>(url, body);
  }
  editTwoCategory(id: string, body: SecondCategory) {
    const url = `${this.uri}/${id}`;
    return this.httpServcie.put<SecondCategory>(url, body);
  }
  deleteTwoCategory(id: string) {
    const url = `${this.uri}/${id}`;
    return this.httpServcie.delete(url);
  }
}
