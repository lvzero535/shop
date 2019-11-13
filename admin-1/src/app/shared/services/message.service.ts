import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class MessageService {

  private subject = new Subject<any>();
  constructor() { }
  sendMessage(msg) {
    this.subject.next(msg);
  }
  clearMessage() {
    this.subject.next();
  }
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
