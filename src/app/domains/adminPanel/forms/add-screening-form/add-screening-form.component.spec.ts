import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScreeningFormComponent } from './add-screening-form.component';

describe('AddScreeningFormComponent', () => {
  let component: AddScreeningFormComponent;
  let fixture: ComponentFixture<AddScreeningFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddScreeningFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddScreeningFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
