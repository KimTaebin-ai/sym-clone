import { TestBed } from '@angular/core/testing';

import { IrbService } from './irb.service';

describe('IrbService', () => {
  let service: IrbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IrbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
