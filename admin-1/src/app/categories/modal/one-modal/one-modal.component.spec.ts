import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneModalComponent } from './one-modal.component';

describe('OneModalComponent', () => {
  let component: OneModalComponent;
  let fixture: ComponentFixture<OneModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
