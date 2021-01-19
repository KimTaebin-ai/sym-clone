import { TestBed } from '@angular/core/testing';

import { ConfigAPIService } from './config-api.service';

describe('ConfigAPIService', () => {
  let service: ConfigAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
