import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoCategoryComponent } from './two-category.component';

describe('TwoCategoryComponent', () => {
  let component: TwoCategoryComponent;
  let fixture: ComponentFixture<TwoCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
