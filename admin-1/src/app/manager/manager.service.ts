import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http/http.service';
import { ManagerResp, Manager } from '../interfaces/manager';
import { IPaginationQueryParams } from '../interfaces/common.interface';

@Injectable()
export class ManagerService {

  private url = '/managers';
  constructor(private httpService: HttpService) {}
  getManagers(params: IPaginationQueryParams, username: string) {
    const querys: any = Object.assign({}, params);
    if (username) {
      querys.username = username;
    }
    return this.httpService.get<ManagerResp>(this.url, querys);
  }
  addManager(manager: Manager) {
    return this.httpService.post<Manager>(this.url, manager);
  }
  editManager(id: string, manager: Manager) {
    const url = `${this.url}/${id}`;
    return this.httpService.put<Manager>(url, manager);
  }
  deleteManager(id: string) {
    const url = `${this.url}/${id}`;
    return this.httpService.delete(url);
  }
}
