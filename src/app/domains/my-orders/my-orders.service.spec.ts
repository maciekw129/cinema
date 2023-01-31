import { TestBed } from '@angular/core/testing';

import { MyOrdersService } from './my-orders.service';

describe('MyOrdersService', () => {
  let service: MyOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
