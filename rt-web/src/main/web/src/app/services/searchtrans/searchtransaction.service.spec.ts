import { TestBed } from '@angular/core/testing';

import { SearchtransactionService } from './searchtransaction.service';

describe('SearchtransactionService', () => {
  let service: SearchtransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchtransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
