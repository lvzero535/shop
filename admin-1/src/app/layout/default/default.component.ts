import { Component, OnInit } from '@angular/core';
import { EmitService } from '@core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  isCollapsed = false;
  constructor(private emit: EmitService) {
    this.emit.emitEvent.subscribe((val) => {
      this.isCollapsed = !this.isCollapsed;
      console.log(val);
    });
  }

  ngOnInit() {
  }

}
