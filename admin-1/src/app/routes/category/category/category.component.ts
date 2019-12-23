import { Component, OnInit, ViewChild } from '@angular/core';
import { FirstModalComponent } from '../components/first-modal/first-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { SecondModalComponent } from '../components/second-modal/second-modal.component';
import { FirstCategoryComponent } from '../first-category/first-category.component';
import { SecondCategoryComponent } from '../second-category/second-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  public firstTab = 'firstTab';
  public secondTab = 'secondTab';
  @ViewChild(FirstCategoryComponent, {static: false })
  private fcCmpt: FirstCategoryComponent;

  @ViewChild(SecondCategoryComponent, {static: false})
  private scCmpt: SecondCategoryComponent;

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
    const that = this;
    this.nzModalService.create({
      nzTitle: '创建一级分类',
      nzMaskClosable: false,
      nzContent: FirstModalComponent,
      nzComponentParams: {
        category: null
      },
      nzOnOk(fmc: FirstModalComponent) {
        if (!fmc.validate()) {
          return false;
        }
        that.fcCmpt.addCategory(fmc.formGroup.value);
      }
    });
  }
  public openSecondCategoryModal() {
    const that = this;
    this.nzModalService.create({
      nzTitle: '创建二级分类',
      nzMaskClosable: false,
      nzContent: SecondModalComponent,
      nzComponentParams: {
        secondCategory: null
      },
      nzOnOk(smc: SecondModalComponent) {
        if (!smc.validate()) {
          return false;
        }
        that.scCmpt.addTwoCategory(smc.formGroup.value);
      }
    });
  }
}
