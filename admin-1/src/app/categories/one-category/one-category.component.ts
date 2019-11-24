import { Component, OnInit, TemplateRef } from '@angular/core';
import { CategoryService } from '../category.service';
import { EmitService } from '@core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { OneModalComponent } from '../modal/one-modal/one-modal.component';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-one-category',
  templateUrl: './one-category.component.html',
  styleUrls: ['./one-category.component.scss']
})
export class OneCategoryComponent implements OnInit {
  public listOfData: Array<Category>;
  public totalNumber = 0;
  public currentPage = 1;
  public pageSize = 10;
  public params: { pageNum: number, pageSize: number} = {
    pageNum: 1,
    pageSize: 10
  };
  public loading = false;
  private searchContent: string;
  constructor(private categoryService: CategoryService,
              private nzModalService: NzModalService,
              private msgService: NzMessageService,
              private emit: EmitService) {
    this.emit.emitEvent.subscribe((val) => {
      this.getOneCategories(this.params);
      console.log(val);
    });
  }

  ngOnInit() {
    this.getOneCategories(this.params);
  }
  refreshFn() {
    this.getOneCategories(this.params, this.searchContent);
  }
  search(content) {
    this.searchContent = content;
    this.getOneCategories(this.params, content);
  }
  pageChange(page) {
    this.params.pageNum = page;
    this.getOneCategories(this.params, this.searchContent);
  }
  getOneCategories(params, name?: string) {
    this.loading = true;
    this.categoryService.getOneCategory(params, name).subscribe((resp) => {
      this.listOfData = resp.categories;
      this.totalNumber = resp.total;
      this.loading = false;
      console.log(resp);
    });
  }

  editBtnFn(category: Category) {
    const modal = this.nzModalService.create({
      nzTitle: '编辑一级分类',
      nzMaskClosable: false,
      nzContent: OneModalComponent,
      nzComponentParams: {
        category
      },
      nzFooter: null
    });
  }
  deleteBtnFn(category: Category, content: TemplateRef<any>) {
    const that = this;
    this.nzModalService.warning({
      nzTitle: '删除一级分类',
      nzContent: content,
      nzCancelText: '确认',
      nzOkText: '取消',
      nzOnCancel() {
        that.deleteCategory(category);
      },
      nzOnOk() {
        // console.log('nzOnOk');
      },
    });
  }
  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
      this.msgService.success(`删除一级分类 ${category.name} 成功！`, {
        nzDuration: 5000,
      });
      this.getOneCategories(this.params);
    });
  }
}
