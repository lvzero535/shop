import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmitService } from '@core';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isCollapsed = false;
  constructor(private translate: TranslateService, private emit: EmitService) {
    this.emit.emitEvent.subscribe((val) => {
      this.isCollapsed = !this.isCollapsed;
      console.log(val);
    });
  }

  ngOnInit() {
  }
  traggerI18n() {
    let lang = this.translate.currentLang;
    lang = lang === 'zh-CN' ? 'en-US' : 'zh-CN';
    this.translate.use(lang);
  }
  logout() {}
}
