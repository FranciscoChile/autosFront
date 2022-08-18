import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarSellingComponent } from './car-selling.component';

describe('CarSellingComponent', () => {
  let component: CarSellingComponent;
  let fixture: ComponentFixture<CarSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarSellingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
