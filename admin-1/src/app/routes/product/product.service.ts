import { Injectable } from '@angular/core';
import { HttpService } from '@core';
import { SecondCategoryResp } from 'src/app/interfaces/second_category';
import { ProdcutResp, Prodcut } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = '/products';
  constructor(private httpService: HttpService) {}
  getTwoCategory(params, name?: string, categoryId?: string) {
    const uri = '/secondcategories';
    const querys = Object.assign({}, params);
    if (categoryId) {
      querys.categoryId = categoryId;
    }
    if (name) {
      querys.name = name;
    }
    return this.httpService.get<SecondCategoryResp>(uri, querys);
  }

  getProducts(params, name?: string, secondCategoryId?: string) {
    const querys = Object.assign({}, params);
    if (secondCategoryId && secondCategoryId !== 'all') {
      querys.secondCategoryId = secondCategoryId;
    }
    if (name) {
      querys.name = name;
    }
    return this.httpService.get<ProdcutResp>(this.url, querys);
  }
  getProductByName(name: string) {
    const url = `${this.url}/name/${name}`;
    return this.httpService.get<Prodcut>(url);
  }
  getProductById(productId: string) {
    const url = `${this.url}/${productId}`;
    return this.httpService.get<Prodcut>(url);
  }
  addProduct(body) {
    return this.httpService.post<Prodcut>(this.url, body);
  }

  editProduct(productId: string, body) {
    const url = `${this.url}/${productId}`;
    return this.httpService.put<Prodcut>(url, body);
  }

  deleteProduct(productId: string) {
    const url = `${this.url}/${productId}`;
    return this.httpService.delete(url);
  }
}
