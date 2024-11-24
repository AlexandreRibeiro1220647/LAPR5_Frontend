import { TestBed } from '@angular/core/testing';

import { AlgavService } from './algav.service';

describe('AlgavService', () => {
  let service: AlgavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
