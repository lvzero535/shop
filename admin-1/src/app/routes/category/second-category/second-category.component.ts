import { Component, OnInit, TemplateRef } from '@angular/core';
import { SecondCategoryService } from '../second-category.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { EmitService } from '@core';
import { FirstCategoryService } from '../first-category.service';
import { Category } from 'src/app/interfaces/category';
import { SecondCategory } from 'src/app/interfaces/second_category';
import { IPaginationQueryParams } from 'src/app/interfaces/common.interface';
import { SecondModalComponent } from '../components/second-modal/second-modal.component';

@Component({
  selector: 'second-category',
  templateUrl: './second-category.component.html',
  styleUrls: ['./second-category.component.scss']
})
export class SecondCategoryComponent implements OnInit {

  public listOfData: Array<SecondCategory>;
  public totalNumber = 0;
  public currentPage = 1;
  public pageSize = 10;
  public params: IPaginationQueryParams = {
    pageNum: 1,
    pageSize: 10
  };
  public oneParams: IPaginationQueryParams = {
    pageNum: 1,
    pageSize: 10
  };
  public loading = false;
  public searchContent: string;
  public oneCategories: Array<Category> = [
    { id: 'all', name: '所有一级分类'}
  ];
  public selectedOneId = 'all';
  public oneSelectPlaceHolder = '请选择一级分类';
  constructor(
    private scService: SecondCategoryService,
    private nzModalService: NzModalService,
    private msgService: NzMessageService,
    private emitService: EmitService,
    private categoryService: FirstCategoryService
  ) {
    this.emitService.emitEvent.subscribe((val) => {
      console.log(val);
      this.getSecondCategories(this.params);
    });
  }

  ngOnInit() {
    this.getSecondCategories(this.params);
    this.getOneCategories(this.oneParams);
  }

  /**
   * ngFor 的trackBy对应的函数
   * @param index 数据索引 从 0 开始
   * @param item 对应的数据
   */
  trackByFn(index: number, item: SecondCategory) {
    return item.id; // 返回标识dom
  }
  search(content) {
    this.searchContent = content;
    this.getSecondCategories(this.params, content);
  }
  refresh() {
    this.getSecondCategories(this.params, this.searchContent);
  }
  oneSelected(oneCategoryId) {
    if (oneCategoryId === 'all') {
      this.getSecondCategories(this.params, this.searchContent);
      console.log(this.selectedOneId);
    } else {
      this.getSecondCategories(this.params, this.searchContent, oneCategoryId);
    }
  }
  // 加载更多的一级分类
  loadMoreOne() {
    this.oneParams.pageNum++;
    this.getOneCategories(this.oneParams);
  }
  pageChange(page) {
    this.params.pageNum = page;
    this.getSecondCategories(this.params, this.searchContent);
  }
  getSecondCategories(param, name?: string, categoryId?: string) {
    this.loading = true;
    this.scService.getTwoCategory(param, name, categoryId).subscribe((resp) => {
      this.listOfData = resp.second_categories;
      this.totalNumber = resp.total;
      this.loading = false;
      console.log(resp);
    });
  }

  getOneCategories(params, name?: string) {
    this.categoryService.getOneCategory(params, name).subscribe((resp) => {
      this.oneCategories = [...this.oneCategories, ...resp.categories];
    });
  }

  editBtnFn(secondCategory: SecondCategory) {
    const that = this;
    this.nzModalService.create({
      nzTitle: '编辑二级分类',
      nzMaskClosable: false,
      nzContent: SecondModalComponent,
      nzComponentParams: {
        secondCategory
      },
      nzOnOk(smc) {
        if (!smc.validate()) {
          return false;
        }
        that.editTwoCategory(secondCategory.id, smc.formGroup.value);
      }
    });
  }

  deleteBtnFn(secondCategory: SecondCategory, content: TemplateRef<any>) {
    const that = this;
    this.nzModalService.warning({
      nzTitle: '删除二级分类',
      nzContent: content,
      nzCancelText: '确认',
      nzOkText: '取消',
      nzOnCancel() {
        that.deleteSecondCategory(secondCategory);
      },
      nzOnOk() {
        // console.log('nzOnOk');
      },
    });
  }

  private deleteSecondCategory(secondCategory: SecondCategory) {
    this.scService.deleteTwoCategory(secondCategory.id).subscribe(() => {
      this.msgService.success(`删除二级分类 ${secondCategory.name} 成功！`, {
        nzDuration: 5000
      });
      this.getSecondCategories(this.params);
    });
  }
  addTwoCategory(body: SecondCategory) {
    this.scService.addTwoCategory(body).subscribe((resp) => {
      this.msgService.success(`创建二级分类 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.getSecondCategories(this.params);
    });
  }

  editTwoCategory(id: string, body: SecondCategory) {
    this.scService.editTwoCategory(id, body).subscribe((resp) => {
      this.msgService.success(`编辑二级分类 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.getSecondCategories(this.params);
    });
  }
}
