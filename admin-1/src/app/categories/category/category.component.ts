import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { OneModalComponent } from '../modal/one-modal/one-modal.component';
import { TwoModalComponent } from '../modal/two-modal/two-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public oneFlag = 'first';
  public twoFlag = 'second';
  constructor(private nzModalService: NzModalService) { }

  ngOnInit() {
    console.log('init');
  }

  selectFn(evt) {
    console.log('daad', evt);
  }

  createBtnFn(type) {
    if (type === this.oneFlag) {
      this.openFirstModal();
    } else {
      this.openSecondModal();
    }
  }
  private openFirstModal() {
    const modal = this.nzModalService.create({
      nzTitle: '创建一级分类',
      nzMaskClosable: false,
      nzContent: OneModalComponent,
      nzComponentParams: {
        category: null
      },
      nzFooter: null
    });
  }

  private openSecondModal() {
    const modal = this.nzModalService.create({
      nzTitle: '创建二级分类',
      nzMaskClosable: false,
      nzContent: TwoModalComponent,
      // nzComponentParams: {
      //   category: null
      // },
      nzFooter: null
    });
  }
}
