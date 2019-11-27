import { Component, OnInit } from '@angular/core';
import { EmitService } from '@core';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed = false;
  constructor(private emit: EmitService) { }

  ngOnInit() {
  }
  changeSader() {
    this.isCollapsed = !this.isCollapsed;
    this.emit.emitEvent.emit('isCollapsed');
  }
}
