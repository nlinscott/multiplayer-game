import { TestBed } from '@angular/core/testing';

import { RemotePlayerService } from './remote-player.service';

describe('RemotePlayerService', () => {
  let service: RemotePlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemotePlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
