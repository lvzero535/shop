import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  URL = 'http://localhost:8888/rest/v1.0';
  IP_PORT = 'http://localhost:8888';
  constructor() { }
}
