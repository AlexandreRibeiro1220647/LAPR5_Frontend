import { TestBed } from '@angular/core/testing';

import { OperationRequestService } from './operation-requests.service';
import { beforeEach, describe, it } from 'node:test';

describe('OperationRequestsService', () => {
  let service: OperationRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
