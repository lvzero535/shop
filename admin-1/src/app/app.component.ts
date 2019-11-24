import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: `
    <div class="router-container">
      <router-outlet></router-outlet>
    </div>
  `,
  // styleUrls: ['./app.component.scss']
  styles: ['.router-container { height: 100%; }']
})
export class AppComponent {
  isCollapsed = false;

  constructor(translate: TranslateService) {
    translate.setDefaultLang('zh-CN');
    translate.use('zh-CN');
  }
}
