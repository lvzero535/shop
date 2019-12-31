import { Injectable } from '@angular/core';
import { I18nService } from './i18n.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StartupService {

  // constructor(private httpClient: HttpClient) {}
  constructor(private i18n: I18nService, private httpClient: HttpClient) {}
  load(): Promise<any> {
    return new Promise(resolve => {
      this.httpClient.get('assets/tmp/app.json').pipe(
        catchError((err) => {
          resolve(null);
          return err;
        })
      ).subscribe(
        (data) => {
          console.log(data);
        },
        () => {},
        () => {
          resolve(null);
        }
      );
    });
  }
}
