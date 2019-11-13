import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmitService {
  public emitEvent = new EventEmitter();
  private subject = new Subject<any>();
  constructor() {}
  sendMsg(val: any) {
    this.subject.next({data: val});
  }
  clearMsg() {
    this.subject.next();
  }
  getMsg(): Observable<any> {
    return this.subject.asObservable();
  }
}
