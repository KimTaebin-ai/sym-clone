import { TestBed } from '@angular/core/testing';

import { DiaryStoreService } from './diary-store.service';

describe('DiaryStoreService', () => {
  let service: DiaryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
