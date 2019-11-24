import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public  get<T>(url: string, params?): Observable<T> {
    return this.http.get<T>(url, {
      params,
      observe: 'body',
      withCredentials: true
    }).pipe(catchError(this.handlerError));
  }
  public post<T>(url: string, body: any, headers?): Observable<T> {
    return this.http.post<T>(url, body, {
      observe: 'body',
      headers,
      withCredentials: true
    });
  }
  public put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body, {
      observe: 'body',
      withCredentials: true
    });
  }

  public delete(url: string) {
    return this.http.delete(url, {
      observe: 'body',
      withCredentials: true
    });
  }

  private handlerError(error: HttpErrorResponse) {
    return throwError('error');
  }
}
