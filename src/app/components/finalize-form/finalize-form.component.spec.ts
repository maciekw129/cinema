import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizeFormComponent } from './finalize-form.component';

describe('FinalizeFormComponent', () => {
  let component: FinalizeFormComponent;
  let fixture: ComponentFixture<FinalizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalizeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
