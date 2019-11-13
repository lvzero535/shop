import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneCategoryComponent } from './one-category.component';

describe('OneCategoryComponent', () => {
  let component: OneCategoryComponent;
  let fixture: ComponentFixture<OneCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
