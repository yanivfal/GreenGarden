import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFormComponent } from './checkout-form.component';

describe('CheckoutFormComponent', () => {
  let component: CheckoutFormComponent;
  let fixture: ComponentFixture<CheckoutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
