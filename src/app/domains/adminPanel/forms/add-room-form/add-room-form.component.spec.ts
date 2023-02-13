import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomFormComponent } from './add-room-form.component';

describe('AddRoomFormComponent', () => {
  let component: AddRoomFormComponent;
  let fixture: ComponentFixture<AddRoomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoomFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddRoomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
