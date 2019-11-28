import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EmitService } from '@core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { FirstCategoryService } from '../../first-category.service';
import { Observer, Observable, of } from 'rxjs';

@Component({
  selector: 'app-first-modal',
  templateUrl: './first-modal.component.html',
})
export class FirstModalComponent implements OnInit {

  public category: Category;
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder,
              private emit: EmitService,
              private nzModalRef: NzModalRef,
              private msgService: NzMessageService,
              private categoryService: FirstCategoryService) {
  }
  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [this.category ? this.category.name : '', [Validators.required, this.nameValidteorSync], [this.nameValidatorAsync()]],
      hot: [this.category ? this.category.hot : false]
    });
  }
  nameValidatorAsync(this: FirstModalComponent) { // 返回一个验证器函数
    return (control: FormControl) => {
      if (this.category && this.category.name === control.value) {
        return of(null);
      }
      return new Observable((observer: Observer<Validators | null>) => {
        this.categoryService.getOneCategoryByName(control.value).subscribe((cr) => {
          if (cr) {
            observer.next({error: true, duplicated: true});
          } else {
            observer.next(null);
          }
          observer.complete();
          console.log(cr);
        });
      });
    };
  }
  nameValidteorSync(control: FormControl): { [s: string]: boolean } {
    const nameRex = /^[a-zA-Z0-9_-]{4,20}$/;
    if (!nameRex.test(control.value)) {
      return { error: true, regex: true };
    }
    return {};
  }

  submitForm(val, category: Category) {
    if (category) {
      this.editCategory(category.id, val);
    } else {
      this.addCategory(val);
    }
  }
  cancelFn(evt) {
    evt.preventDefault();
    this.nzModalRef.close();
  }
  addCategory(body: Category) {
    this.categoryService.addCategory(body).subscribe((resp) => {
      this.msgService.success(`创建一级分类 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.emit.emitEvent.emit('refreshCategoryData');
      this.nzModalRef.close();
      console.log(resp);
    });
  }
  editCategory(id: string, body: Category) {
    this.categoryService.editCategory(id, body).subscribe((resp) => {
      this.msgService.success(`编辑一级分类 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.emit.emitEvent.emit('refreshCategoryData');
      this.nzModalRef.close();
      console.log(resp);
    });
  }

}
