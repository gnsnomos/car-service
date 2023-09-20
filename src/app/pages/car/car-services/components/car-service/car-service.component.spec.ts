import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarServiceComponent } from './car-service.component';

describe('VehileComponent', () => {
  let component: CarServiceComponent;
  let fixture: ComponentFixture<CarServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarServiceComponent]
    });
    fixture = TestBed.createComponent(CarServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
