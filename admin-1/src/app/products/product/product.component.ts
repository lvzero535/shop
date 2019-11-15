import { Component, OnInit, TemplateRef } from '@angular/core';
import { IPaginationQueryParams } from 'src/app/interfaces/common.interface';
import { ProductService } from '../product.service';
import { SecondCategory } from 'src/app/interfaces/second_category';
import { Prodcut } from 'src/app/interfaces/product';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { EmitService } from 'src/app/shared/services/emit.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from '@env/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private params: IPaginationQueryParams = {
    pageNum: 1, pageSize: 10
  };
  private twoParams: IPaginationQueryParams = {
    pageNum: 1, pageSize: 10
  };
  public twoCategories: Array<SecondCategory> = [
    { id: 'all', name: '所有二级分类' }
  ];
  public selectedTwoId = 'all';
  private searchContent: string;

  public currentPage = 1;
  public totalNumber = 0;
  public pageSize = 10;
  public loading = false;
  public listOfData: Array<Prodcut>;
  public backendAddr: string;
  constructor(private productService: ProductService,
              private nzModalService: NzModalService,
              private msgService: NzMessageService,
              private router: Router,
              private messagegService: MessageService,
              private emitService: EmitService) {
                this.backendAddr = environment.IP_PORT;
               }

  ngOnInit() {
    this.getProducts(this.params);
    this.getTwoCategroies(this.twoParams);
  }
  loadMoreTwo() {
    this.twoParams.pageNum++;
    this.getTwoCategroies(this.twoParams);
  }
  oneSelected(selectedTwoId) {
    this.getProducts(this.params, this.searchContent, selectedTwoId);
  }
  search(content) {
    this.searchContent = content;
    this.getProducts(this.params, this.searchContent, this.selectedTwoId);
  }
  refresh() {
    this.getProducts(this.params, this.searchContent, this.selectedTwoId);
  }
  editBtnFn(product: Prodcut) {
    this.router.navigate(['/home/product/create'], {queryParams: {product_id: product.id}});
    // this.messagegService.sendMessage(product);
  }
  deleteBtnFn(product: Prodcut, content: TemplateRef<any>) {
    const that = this;
    this.nzModalService.warning({
      nzTitle: '删除产品',
      nzContent: content,
      nzCancelText: '确认',
      nzOkText: '取消',
      nzOnCancel() {
        that.deleteProduct(product);
      },
      nzOnOk() {
        // console.log('nzOnOk');
      },
    });
  }
  private deleteProduct(product: Prodcut) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.msgService.success(`删除产品 ${product.name} 成功！`, {
        nzDuration: 5000
      });
      this.getProducts(this.params);
    });
  }
  pageChange(pageNum) {
    this.params.pageNum = pageNum;
    this.getProducts(this.params, this.searchContent, this.selectedTwoId);
  }
  private getProducts(params, name?: string, secondCategoryId?: string) {
    this.loading = true;
    this.productService.getProducts(params, name, secondCategoryId).subscribe((resp) => {
      this.listOfData = resp.products;
      this.totalNumber = resp.total;
      this.loading = false;
    });
  }
  private getTwoCategroies(params) {
    this.productService.getTwoCategory(params).subscribe((resp) => {
      this.twoCategories = [...this.twoCategories, ...resp.second_categories];
    });
  }
}
