import { TestBed } from '@angular/core/testing';

import { ClampProviderService } from './clamp-provider.service';

describe('ClampProviderService', () => {
  let service: ClampProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClampProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
