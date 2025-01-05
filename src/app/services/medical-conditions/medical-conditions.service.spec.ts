import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MedicalConditionsService } from './medical-conditions.service';
import { MedicalConditionDTO } from '../../models/medical-condition/medicalConditionDTO';
import { SearchMedicalConditionDTO } from '../../models/medical-condition/searchMedicalConditionDTO';

describe('MedicalConditionsService', () => {
  let service: MedicalConditionsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MedicalConditionsService,
        { provide: 'BACKENDMRAM_URL', useValue: 'http://fakeapi.com' },
      ],
    });

    service = TestBed.inject(MedicalConditionsService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(service, 'getToken').and.returnValue('fake-token'); // Mock do token
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se todas as requisições foram tratadas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch medical conditions', () => {
    const mockMedicalConditions: MedicalConditionDTO[] = [
      { code: 'MC1', designation: 'Asthma', description: 'Chronic respiratory condition', commonSymptoms: '' },
      { code: 'MC2', designation: 'Diabetes', description: 'Chronic metabolic disorder', commonSymptoms: '' },
    ];

    service.getItems().subscribe((medicalConditions) => {
      expect(medicalConditions.length).toBe(2);
      expect(medicalConditions).toEqual(mockMedicalConditions);
    });

    const req = httpMock.expectOne('http://fakeapi.com/medicalConditions');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockMedicalConditions); // Simula a resposta da API
  });

  it('should create a medical condition', () => {
    const newMedicalCondition: MedicalConditionDTO = {
      code: 'MC3',
      designation: 'Hypertension',
      description: 'High blood pressure',
      commonSymptoms: '',
    };

    service.createItem(newMedicalCondition).subscribe((response) => {
      expect(response).toEqual(newMedicalCondition);
    });

    const req = httpMock.expectOne('http://fakeapi.com/medicalConditions');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newMedicalCondition);
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(newMedicalCondition); // Simula a resposta da API
  });

  it('should update a medical condition', () => {
    const updatedMedicalCondition: MedicalConditionDTO = {
      code: 'MC1',
      designation: 'Asthma',
      description: 'Severe asthma',
      commonSymptoms: '',
    };

    service.updateItem(updatedMedicalCondition).subscribe((response) => {
      expect(response).toEqual(updatedMedicalCondition);
    });

    const req = httpMock.expectOne('http://fakeapi.com/medicalConditions');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedMedicalCondition);
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(updatedMedicalCondition); // Simula a resposta da API
  });

  it('should search medical conditions', () => {
    const searchCriteria: SearchMedicalConditionDTO = {
      code: 'MC1',
      designation: 'Asthma',
    };

    const mockResults: MedicalConditionDTO[] = [
      { code: 'MC1', designation: 'Asthma', description: 'Chronic respiratory condition', commonSymptoms: ''},
    ];

    service.searchItems(searchCriteria).subscribe((results) => {
      expect(results).toEqual(mockResults);
    });

    const req = httpMock.expectOne((req) =>
      req.url === 'http://fakeapi.com/medicalConditions/search' &&
      req.params.has('code') &&
      req.params.has('designation')
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResults); // Simula a resposta da API
  });
});
