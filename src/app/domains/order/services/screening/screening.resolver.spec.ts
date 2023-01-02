import { TestBed } from '@angular/core/testing';

import { ScreeningResolver } from './screening.resolver';

describe('ScreeningResolver', () => {
  let resolver: ScreeningResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ScreeningResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
