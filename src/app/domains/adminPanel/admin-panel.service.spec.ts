import { TestBed } from '@angular/core/testing';

import { AdminPanelService } from './admin-panel.service';

describe('AdminPanelService', () => {
  let service: AdminPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
