import { Injectable } from '@angular/core';
import { HttpService } from '@core';
import { CategoriesResp, Category } from '../interfaces/category';

@Injectable()
export class CategoryService {
  private uri = '/categories';
  constructor(private httpServcie: HttpService) { }

  getOneCategory(parmas, name?: string) {
    const querys = name ? Object.assign({name}, parmas) : parmas;
    const url = `${this.uri}`;
    return this.httpServcie.get<CategoriesResp>(url, querys);
  }
  getOneCategoryByName(name: string) {
    const url = `${this.uri}/name/${name}`;
    return this.httpServcie.get<Category>(url);
  }
  addCategory(body: Category) {
    const url = `${this.uri}`;
    return this.httpServcie.post<Category>(url, body);
  }
  editCategory(id: string, body: Category) {
    const url = `${this.uri}/${id}`;
    return this.httpServcie.put<Category>(url, body);
  }
  deleteCategory(id: string) {
    const url = `${this.uri}/${id}`;
    return this.httpServcie.delete(url);
  }
}
