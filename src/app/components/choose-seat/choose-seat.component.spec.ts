import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSeatComponent } from './choose-seat.component';

describe('ChooseSeatComponent', () => {
  let component: ChooseSeatComponent;
  let fixture: ComponentFixture<ChooseSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseSeatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
