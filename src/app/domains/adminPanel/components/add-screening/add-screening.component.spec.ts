import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreeningComponent } from './add-screening.component';

describe('AddScreeningComponent', () => {
  let component: AddScreeningComponent;
  let fixture: ComponentFixture<AddScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScreeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
