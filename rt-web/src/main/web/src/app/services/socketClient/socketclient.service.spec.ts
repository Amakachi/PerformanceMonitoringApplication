import { TestBed } from '@angular/core/testing';

import { SocketclientService } from './socketclient.service';

describe('SocketclientService', () => {
  let service: SocketclientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketclientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
