import { TestBed } from '@angular/core/testing';

import { MedicalConditionsService } from './medical-conditions.service';

describe('MedicalConditionsService', () => {
  let service: MedicalConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
