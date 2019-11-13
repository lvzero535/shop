import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SecondCategory } from 'src/app/interfaces/second_category';
import { ProductService } from '../product.service';
import { IPaginationQueryParams } from 'src/app/interfaces/common.interface';
import { Observable, Observer, Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, NavigationStart, NavigationEnd, ActivationStart, ActivatedRoute, ParamMap } from '@angular/router';
import { filter } from 'rxjs/operators';
import { EmitService } from 'src/app/shared/services/emit.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Prodcut } from 'src/app/interfaces/product';
import { AppConfig } from 'src/app/AppConfig';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  public selectSecondCategories: Array<SecondCategory> = [];
  public formGroup: FormGroup;
  public secondParams: IPaginationQueryParams = {
    pageNum: 1, pageSize: 10
  };
  public file: File;
  private isEdit = false;
  public imgUrl: string;
  public product: Prodcut;
  constructor(private fb: FormBuilder,
              private router: Router,
              private msgService: NzMessageService,
              private appConfig: AppConfig,
              private productService: ProductService,
              private route: ActivatedRoute,
              ) {
    this.formGroup = this.fb.group({
      secondCategoryId: [''],
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_-\u4e00-\u9fa5]{4,20}$/)],
            [this.nameUniqueCheck()]],
      price: [0, Validators.required],
      promotionPrice: [0, Validators.required],
      remark: [''],
      isHot: [true],
    });
  }
  fileChange(evt) {
    console.log(evt);
    const file: File = evt.target.files[0];
    this.file = file;
    console.log(file);
    this.imgUrl = URL.createObjectURL(file);
  }
  private nameUniqueCheck(this: CreateProductComponent) {
    return (control: FormControl) => {
      return new Observable((observer: Observer<Validators | null>) => {
        this.productService.getProductByName(control.value).subscribe((resp) => {
          if (resp) {
            observer.next({duplicated: true});
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      });
    };
  }
  private initEditProdcut(product: Prodcut) {
    this.setSelectSecondCategories([product.secondCategory]);
    this.formGroup.setValue({
      secondCategoryId: product.secondCategory.id,
      name: product.name,
      price: product.price,
      promotionPrice: product.promotionPrice,
      remark: product.remark,
      isHot: product.isHot
    });
    this.imgUrl = `${this.appConfig.IP_PORT}/${product.imageUrl}`;
    this.isEdit = true;
    this.product = product;
    console.log(this.formGroup);
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((paramsMap: ParamMap) => {
      const producId = paramsMap.get('product_id');
      if (producId) {
        this.getProductById(producId);
        return;
      }
      this.getTwoCategories(this.secondParams);
    });
  }
  loadMoreTwo() {
    this.secondParams.pageNum++;
    this.getTwoCategories(this.secondParams);
  }
  private getFormData(val: any): FormData {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('name', val.name);
    formData.append('secondCategoryId', val.secondCategoryId);
    formData.append('price', val.price);
    formData.append('promotionPrice', val.promotionPrice);
    formData.append('remark', val.remark);
    formData.append('isHot', val.isHot);
    return formData;
  }
  onSubmit(val: any) {
    const formData = this.getFormData(val);
    if (this.isEdit) {
      this.editProduct(this.product.id, formData);
      return;
    }
    this.addProduct(formData);
  }
  private getTwoCategories(params: IPaginationQueryParams) {
    this.productService.getTwoCategory(params).subscribe((resp) => {
      this.setSelectSecondCategories(resp.second_categories);
    });
  }
  private setSelectSecondCategories(secondCategories: Array<SecondCategory>) {
    this.selectSecondCategories = [...this.selectSecondCategories, ...secondCategories];
    if (this.selectSecondCategories.length > 0) {
      const secondCategoryId =  this.formGroup.get('secondCategoryId').value;
      this.formGroup.patchValue({
        secondCategoryId: secondCategoryId || this.selectSecondCategories[0].id
      });
    }
  }
  private addProduct(body) {
    this.productService.addProduct(body).subscribe((resp) => {
      this.msgService.success(`创建产品 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.router.navigate(['/home/product']);
    });
  }
  private editProduct(productId: string, body: FormData) {
    this.productService.editProduct(productId, body).subscribe((resp) => {
      this.msgService.success(`编辑产品 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.router.navigate(['/home/product']);
    });
  }
  private getProductById(productId: string) {
    this.productService.getProductById(productId).subscribe((prod) => {
      this.initEditProdcut(prod);
      console.log(prod);
    });
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
