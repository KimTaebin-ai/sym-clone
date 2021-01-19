import { TestBed } from '@angular/core/testing';

import { DiaryHelperService } from './diary-helper.service';

describe('DiaryHelperService', () => {
  let service: DiaryHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
