import { TestBed } from '@angular/core/testing';

import { CanLoginGuard } from './can-login.guard';

describe('CanLoginGuard', () => {
  let guard: CanLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
