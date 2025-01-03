import { TestBed } from '@angular/core/testing';

import { AppointmentSurgeryService } from './appointment-surgery.service';

describe('AppointmentSurgeryService', () => {
  let service: AppointmentSurgeryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentSurgeryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
