import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  public firstTab = 'firstTab';
  public secondTab = 'secondTab';

  constructor() {
    console.log('constructor');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  selectFn(evt) {
    console.log('daad', evt);
  }
  btnClickFn(callback: () => {}) {
    callback();
  }

  public openFirstCategoryModal() {
    console.log('openFirstCategoryModal');
  }
  public openSecondCategoryModal() {
    console.log('openSecondCategoryModal');
  }
}
