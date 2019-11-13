import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SecondCategoryService } from '../../second_category.service';
import { EmitService } from 'src/app/shared/services/emit.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../../category.service';
import { of, Observable, Observer } from 'rxjs';
import { SecondCategory } from 'src/app/interfaces/second_category';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-two-modal',
  templateUrl: './two-modal.component.html',
  styleUrls: ['./two-modal.component.scss']
})
export class TwoModalComponent implements OnInit {

  public secondCategory: SecondCategory;
  public formGroup: FormGroup;
  public oneCategories: Array<Category> = [];
  public selectedOneId = '';
  public isEditContent = false;
  public params: { pageNum: number, pageSize: number} = {
    pageNum: 1,
    pageSize: 10
  };
  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private msgService: NzMessageService,
    private emitService: EmitService,
    private categorySerice: CategoryService,
    private scService: SecondCategoryService
  ) { }

  nameValidatorAsync(this: TwoModalComponent) {
    return (control: FormControl) => {
      if (this.secondCategory && this.secondCategory.name === control.value) {
        return of(null);
      }
      return new Observable((observer: Observer<Validators | null>) => {
        this.scService.getTwoCategoryByName(control.value).subscribe((cs) => {
          if (cs) {
            observer.next({error: true, duplicated: true});
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      });
    };
  }
  nameValidator(control: FormControl): { [s: string]: boolean } {
    const nameRex = /^[a-zA-Z0-9_-]{4,20}$/;
    if (!nameRex.test(control.value)) {
      return { error: true, regex: true };
    }
    return {};
  }
  ngOnInit() {
    this.formGroup = this.fb.group({
      category_id: ['', [Validators.required]],
      name: ['', [Validators.required, this.nameValidator], [this.nameValidatorAsync()]],
      isPulished: [true]
    });
    if (this.secondCategory) {
      this.isEditContent = true;
      this.selectedOneId =  this.secondCategory.category.id;
      this.oneCategories = [this.secondCategory.category];
      this.formGroup.setValue({
        category_id: this.secondCategory.category.id,
        name: this.secondCategory.name,
        isPulished: this.secondCategory.isPulished
      });
    } else {
      this.getCategories(this.params);
    }
  }
  loadMoreOne() {
    this.params.pageNum++;
    this.getCategories(this.params);
  }
  submitForm(val, secondCategory: SecondCategory) {
    if ( secondCategory ) {
      this.editTwoCategory(secondCategory.id, val);
    } else {
      this.addTwoCategory(val);
    }
  }

  cancelFn(evt) {
    evt.preventDefault();
    this.modalRef.close();
  }
  getCategories(param, name?: string) {
    this.categorySerice.getOneCategory(param, name).subscribe((resp) => {
      this.oneCategories = [...this.oneCategories, ...resp.categories];
      if (resp.total > 0) {
        this.selectedOneId = this.selectedOneId || this.oneCategories[0].id;
      }
    });
  }
  private addTwoCategory(body: SecondCategory) {
    this.scService.addTwoCategory(body).subscribe((resp) => {
      this.msgService.success(`创建二级分类 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.emitService.emitEvent.emit('refreshTwoCategoryData');
      this.modalRef.close();
    });
  }

  private editTwoCategory(id: string, body: SecondCategory) {
    this.scService.editTwoCategory(id, body).subscribe((resp) => {
      this.msgService.success(`编辑二级分类 ${resp.name} 成功！`, {
        nzDuration: 5000,
      });
      this.emitService.emitEvent.emit('refreshTwoCategoryData');
      this.modalRef.close();
    });
  }
}
