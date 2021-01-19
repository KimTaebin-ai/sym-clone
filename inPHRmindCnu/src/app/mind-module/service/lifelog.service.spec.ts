import { TestBed } from '@angular/core/testing';

import { LifelogService } from './lifelog.service';

describe('LifelogService', () => {
  let service: LifelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LifelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
