import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpecializationsService } from './specialization.service';
import { CreateSpecializationDto, SearchSpecializationDto, Specialization, SpecializationDto } from '../../models/staff/staff';

describe('SpecializationsService', () => {
  let service: SpecializationsService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SpecializationsService,
        { provide: 'API_URL', useValue: apiUrl },
      ],
    });
    service = TestBed.inject(SpecializationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all specializations', () => {
    const mockSpecializations: Specialization[] = [
      new Specialization('1', 'Cardiology', 'CARD', 'Specialization in Cardiology'),
    ];

    service.getAll().subscribe((specializations) => {
      expect(specializations).toEqual(mockSpecializations);
    });

    const req = httpMock.expectOne(`${apiUrl}/specializations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecializations);
  });

  it('should fetch a specialization by ID', () => {
    const mockSpecialization: SpecializationDto = new SpecializationDto(
      '1',
      'Cardiology',
      'CARD',
      'Specialization in Cardiology'
    );

    service.getById('1').subscribe((specialization) => {
      expect(specialization).toEqual(mockSpecialization);
    });

    const req = httpMock.expectOne(`${apiUrl}/specializations/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecialization);
  });

  it('should search specializations', () => {
    const mockSearchDto: SearchSpecializationDto = new SearchSpecializationDto('Cardiology', 'CARD', 'Specialization in Cardiology');
    const mockSpecializations: Specialization[] = [
      new Specialization('1', 'Cardiology', 'CARD', 'Specialization in Cardiology'),
    ];

    service.search(mockSearchDto).subscribe((specializations) => {
      expect(specializations).toEqual(mockSpecializations);
    });

    const req = httpMock.expectOne((request) => {
      return (
        request.url === `${apiUrl}/specializations/search` &&
        request.params.has('designation') &&
        request.params.get('designation') === 'Cardiology'
      );
    });
    expect(req.request.method).toBe('GET');
    req.flush(mockSpecializations);
  });

  it('should create a specialization', () => {
    const mockCreateDto: CreateSpecializationDto = new CreateSpecializationDto('Dermatology', 'DERM', 'Specialization in Dermatology');
    const mockSpecialization: SpecializationDto = new SpecializationDto(
      '2',
      'Dermatology',
      'DERM',
      'Specialization in Dermatology'
    );

    service.create(mockCreateDto).subscribe((specialization) => {
      expect(specialization).toEqual(mockSpecialization);
    });

    const req = httpMock.expectOne(`${apiUrl}/specializations`);
    expect(req.request.method).toBe('POST');
    req.flush(mockSpecialization);
  });

  it('should update a specialization', () => {
    const mockUpdateDto: CreateSpecializationDto = new CreateSpecializationDto('Updated Dermatology', 'DERM-UPD', 'Updated Description');
    const mockSpecialization: SpecializationDto = new SpecializationDto(
      '2',
      'Updated Dermatology',
      'DERM-UPD',
      'Updated Description'
    );

    service.update('2', mockUpdateDto).subscribe((specialization) => {
      expect(specialization).toEqual(mockSpecialization);
    });

    const req = httpMock.expectOne(`${apiUrl}/specializations/2`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockSpecialization);
  });

  /*it('should delete a specialization', () => {
    service.delete('2').subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/specializations/2`);
    expect(req.request.method).toBe('DELETE');
    req.flush(undefined);
  });*/
});
