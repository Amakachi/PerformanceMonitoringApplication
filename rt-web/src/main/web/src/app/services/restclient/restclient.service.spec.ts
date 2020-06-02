import { TestBed } from '@angular/core/testing';

import { RestclientService } from './restclient.service';

describe('RestclientService', () => {
  let service: RestclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
