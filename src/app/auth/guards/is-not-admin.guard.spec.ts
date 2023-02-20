import { TestBed } from '@angular/core/testing';

import { IsNotAdminGuard } from './is-not-admin.guard';

describe('IsNotAdminGuard', () => {
  let guard: IsNotAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNotAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
