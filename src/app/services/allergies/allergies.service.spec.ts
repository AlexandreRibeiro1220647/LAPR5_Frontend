import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AllergiesService } from './allergies.service';
import { AllergyDTO } from '../../models/allergy/allergyDTO';
import { SearchAllergyDTO } from '../../models/allergy/searchAllergyDTO';

describe('AllergiesService', () => {
  let service: AllergiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AllergiesService,
        { provide: 'BACKENDMRAM_URL', useValue: 'http://fakeapi.com' },
      ],
    });

    service = TestBed.inject(AllergiesService);
    httpMock = TestBed.inject(HttpTestingController);

    spyOn(service, 'getToken').and.returnValue('fake-token'); // Mock do token
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se todas as requisições foram tratadas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch allergies', () => {
    const mockAllergies: AllergyDTO[] = [
      { code: 'A1', designation: 'Peanut', description: 'Peanut allergy' },
      { code: 'A2', designation: 'Dust', description: 'Dust allergy' },
    ];

    service.getItems().subscribe((allergies) => {
      expect(allergies.length).toBe(2);
      expect(allergies).toEqual(mockAllergies);
    });

    const req = httpMock.expectOne('http://fakeapi.com/allergies');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockAllergies); // Simula a resposta da API
  });

  it('should create an allergy', () => {
    const newAllergy: AllergyDTO = {
      code: 'A3',
      designation: 'Pollen',
      description: 'Pollen allergy',
    };

    service.createItem(newAllergy).subscribe((response) => {
      expect(response).toEqual(newAllergy);
    });

    const req = httpMock.expectOne('http://fakeapi.com/allergies');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newAllergy);
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(newAllergy); // Simula a resposta da API
  });

  it('should update an allergy', () => {
    const updatedAllergy: AllergyDTO = {
      code: 'A1',
      designation: 'Peanut',
      description: 'Severe peanut allergy',
    };

    service.updateItem(updatedAllergy).subscribe((response) => {
      expect(response).toEqual(updatedAllergy);
    });

    const req = httpMock.expectOne('http://fakeapi.com/allergies');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedAllergy);
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(updatedAllergy); // Simula a resposta da API
  });

  it('should search allergies', () => {
    const searchCriteria: SearchAllergyDTO = {
      code: 'A1',
      designation: 'Peanut',
    };

    const mockResults: AllergyDTO[] = [
      { code: 'A1', designation: 'Peanut', description: 'Peanut allergy' },
    ];

    service.searchItems(searchCriteria).subscribe((results) => {
      expect(results).toEqual(mockResults);
    });

    const req = httpMock.expectOne((req) =>
      req.url === 'http://fakeapi.com/allergies/search' &&
      req.params.has('code') &&
      req.params.has('designation')
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer fake-token');
    req.flush(mockResults); // Simula a resposta da API
  });
});
