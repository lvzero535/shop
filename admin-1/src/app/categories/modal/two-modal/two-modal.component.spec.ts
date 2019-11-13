import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoModalComponent } from './two-modal.component';

describe('TwoModalComponent', () => {
  let component: TwoModalComponent;
  let fixture: ComponentFixture<TwoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
