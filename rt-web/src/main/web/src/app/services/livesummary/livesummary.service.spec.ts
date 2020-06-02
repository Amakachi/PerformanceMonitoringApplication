import { TestBed } from '@angular/core/testing';

import { LivesummaryService } from './livesummary.service';

describe('LivesummaryService', () => {
  let service: LivesummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivesummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
