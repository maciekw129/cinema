import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenSeatComponent } from './chosen-seat.component';

describe('ChosenSeatComponent', () => {
  let component: ChosenSeatComponent;
  let fixture: ComponentFixture<ChosenSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChosenSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
