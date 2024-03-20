import { TestBed } from '@angular/core/testing';

import { OpenplService } from './openpl.service';

describe('OpenplService', () => {
  let service: OpenplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
