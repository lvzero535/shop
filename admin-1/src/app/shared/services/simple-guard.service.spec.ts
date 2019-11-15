import { TestBed } from '@angular/core/testing';

import { SimpleGuardService } from './simple-guard.service';

describe('SimpleGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SimpleGuardService = TestBed.get(SimpleGuardService);
    expect(service).toBeTruthy();
  });
});
