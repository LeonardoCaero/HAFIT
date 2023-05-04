import { TestBed } from '@angular/core/testing';

import { EventemiterServiceService } from './eventemiter-service.service';

describe('EventemiterServiceService', () => {
  let service: EventemiterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventemiterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
