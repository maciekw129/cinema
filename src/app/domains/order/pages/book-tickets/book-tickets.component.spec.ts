import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTicketsComponent } from './book-tickets.component';

describe('BookTicketsComponent', () => {
  let component: BookTicketsComponent;
  let fixture: ComponentFixture<BookTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
