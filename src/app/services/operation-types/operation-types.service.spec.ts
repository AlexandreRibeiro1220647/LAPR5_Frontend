import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OperationTypesService } from './operation-types.service';
import { CreateOperationTypeDTO } from '../../models/operation-types/createOperationTypeDTO';
import { UpdateOperationTypeDTO } from '../../models/operation-types/updateOperationTypeDTO';
import { SearchOperationTypeDTO } from '../../models/operation-types/searchOperationTypeDTO';
import { OperationType } from '../../models/operation-types/operationType';

describe('OperationTypesService', () => {
  let service: OperationTypesService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://mock-api.com';
  const mockToken = 'mock-token';

  beforeEach(() => {
    // Mock sessionStorage to return the mock token
    spyOn(sessionStorage, 'getItem').and.returnValue(mockToken);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OperationTypesService,
        { provide: 'API_URL', useValue: mockApiUrl }
      ]
    });

    service = TestBed.inject(OperationTypesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get items', () => {
    const mockOperationTypes: OperationType[] = [
      { name: 'Operation 1', requiredStaffBySpecialization: [''], estimatedDuration: [''], operationTypeId: '1', isActive: true },
      { name: 'Operation 2', requiredStaffBySpecialization: [''], estimatedDuration: [''], operationTypeId: '2', isActive: false }
    ];

    service.getItems().subscribe((items) => {
      expect(items.length).toBe(2);
      expect(items).toEqual(mockOperationTypes);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/OperationType`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOperationTypes);
  });

  it('should create an item', () => {
    const newOperation: CreateOperationTypeDTO = { name: 'New Operation', requiredStaffBySpecialization: [''], estimatedDuration: [''] };

    service.createItem(newOperation).subscribe((createdOperation) => {
      expect(createdOperation.name).toBe('New Operation');
    });

    const req = httpMock.expectOne(`${mockApiUrl}/OperationType`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newOperation);
    req.flush(newOperation);
  });

  it('should update an item', () => {
    const updatedOperation: UpdateOperationTypeDTO = { name: 'Updated Operation' };
    const operationId = '1';

    service.updateItem(operationId, updatedOperation).subscribe((response) => {
      expect(response.name).toBe('Updated Operation');
    });

    const req = httpMock.expectOne(`${mockApiUrl}/OperationType/update/${operationId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedOperation);
    req.flush(updatedOperation);
  });

  it('should delete an item', () => {
    const operationId = '1';
    const mockOperation: OperationType = { name: 'Operation 1', requiredStaffBySpecialization: [''], estimatedDuration: [''], operationTypeId: '1', isActive: true };

    service.deleteItem(operationId).subscribe((response) => {
      expect(response).toEqual(mockOperation);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/OperationType/delete/${operationId}`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockOperation);
  });

  it('should search items', () => {
    const filter: SearchOperationTypeDTO = { name: 'Operation' };
    const mockSearchResults: OperationType[] = [
      { name: 'Operation 1', requiredStaffBySpecialization: [''], estimatedDuration: [''], operationTypeId: '1', isActive: true },
      { name: 'Operation 2', requiredStaffBySpecialization: [''], estimatedDuration: [''], operationTypeId: '2', isActive: false }
    ];

    service.searchItems(filter).subscribe((items) => {
      expect(items.length).toBe(2);
      expect(items).toEqual(mockSearchResults);
    });

    const req = httpMock.expectOne((req) => req.url === `${mockApiUrl}/OperationType/search`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('name')).toBe('Operation');
    req.flush(mockSearchResults);
  });
});
