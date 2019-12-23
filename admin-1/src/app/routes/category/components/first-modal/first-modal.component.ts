import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FirstCategoryService } from '../../first-category.service';
import { Observer, Observable, of } from 'rxjs';
import { validate } from '@core';

@Component({
  selector: 'app-first-modal',
  templateUrl: './first-modal.component.html',
})
export class FirstModalComponent implements OnInit {

  public category: Category;
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder,
              private categoryService: FirstCategoryService) {
  }
  ngOnInit() {
    this.formGroup = this.fb.group({
      name: [ this.category ? this.category.name : '',
              [Validators.required, Validators.pattern('^[a-zA-Z0-9_-]{4,20}$')],
              [this.nameValidatorAsync()]
            ],
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
        });
      });
    };
  }
  validate() {
    return validate(this.formGroup);
  }
}
