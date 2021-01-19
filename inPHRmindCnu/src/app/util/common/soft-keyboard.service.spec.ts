import { TestBed } from '@angular/core/testing';

import { SoftKeyboardService } from './soft-keyboard.service';

describe('SoftKeyboardService', () => {
  let service: SoftKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
