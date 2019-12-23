import { Component, OnInit } from '@angular/core';
import { SecondCategory } from 'src/app/interfaces/second_category';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { validate } from '@core';
import { FirstCategoryService } from '../../first-category.service';
import { SecondCategoryService } from '../../second-category.service';
import { of, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-second-modal',
  templateUrl: './second-modal.component.html',
})
export class SecondModalComponent implements OnInit {

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
    private categorySerice: FirstCategoryService,
    private scService: SecondCategoryService
  ) { }

  nameValidatorAsync(this: SecondModalComponent) {
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
  ngOnInit() {
    this.formGroup = this.fb.group({
      category_id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{4,20}$')], [this.nameValidatorAsync()]],
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
  validate() {
    return validate(this.formGroup);
  }
  getCategories(param, name?: string) {
    this.categorySerice.getOneCategory(param, name).subscribe((resp) => {
      this.oneCategories = [...this.oneCategories, ...resp.categories];
      if (resp.total > 0) {
        this.selectedOneId = this.selectedOneId || this.oneCategories[0].id;
      }
    });
  }

}
