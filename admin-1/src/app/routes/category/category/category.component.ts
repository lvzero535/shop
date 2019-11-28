import { Component, OnInit, ViewChild } from '@angular/core';
import { FirstModalComponent } from '../components/first-modal/first-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { SecondModalComponent } from '../components/second-modal/second-modal.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  public firstTab = 'firstTab';
  public secondTab = 'secondTab';

  constructor(private nzModalService: NzModalService) {
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  selectFn(evt) {
    console.log('daad', evt);
  }

  btnClickFn(tab) {
    if (tab === this.firstTab) {
      this.openFirstCategoryModal();
    } else if (tab === this.secondTab) {
      this.openSecondCategoryModal();
    }
  }

  public openFirstCategoryModal() {
    this.nzModalService.create({
      nzTitle: '创建一级分类',
      nzMaskClosable: false,
      nzContent: FirstModalComponent,
      nzComponentParams: {
        category: null
      },
      nzOnOk(fmc: FirstModalComponent) {
        console.log(fmc);
        return false;
      }
    });
  }
  public openSecondCategoryModal() {
    const modal = this.nzModalService.create({
      nzTitle: '创建二级分类',
      nzMaskClosable: false,
      nzContent: SecondModalComponent,
      // nzComponentParams: {
      //   category: null
      // },
      nzOnOk(smc: SecondModalComponent) {
        console.log(smc);
        return false;
      }
    });
  }
}
