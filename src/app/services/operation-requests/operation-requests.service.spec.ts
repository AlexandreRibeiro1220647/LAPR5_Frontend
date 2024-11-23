import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OperationRequestService } from './operation-requests.service';
import { OperationRequest } from '../../models/operation-requests/operationRequest';
import { CreateOperationRequestDTO } from '../../models/operation-requests/createOperationRequestDTO';
import { UpdateOperationRequestDTO } from '../../models/operation-requests/updateOperationRequestDTO';

describe('OperationRequestService', () => {
  let service: OperationRequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OperationRequestService,
        { provide: 'API_URL', useValue: 'http://fakeapi.com' },
      ],
    });
    service = TestBed.inject(OperationRequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Garante que todas as requisições foram tratadas
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch operation requests', () => {
    const mockOperationRequests: OperationRequest[] = [
      {
        operationId: '1',
        patientId: 'p1',
        doctorId: 'd1',
        operationTypeId: '1',
        deadline: '2024-12-01',
        priority: 'elective',
      },
      {
        operationId: '2',
        patientId: 'p2',
        doctorId: 'd2',
        operationTypeId: '2',
        deadline: '2024-12-05',
        priority: 'urgent',
      },
    ];

    service.getItems().subscribe((operations) => {
      expect(operations.length).toBe(2);
      expect(operations).toEqual(mockOperationRequests);
    });

    const req = httpMock.expectOne('http://fakeapi.com/operations');
    expect(req.request.method).toBe('GET');
    req.flush(mockOperationRequests); // Simula a resposta da API
  });

  it('should create an operation request', () => {
    const newRequest: CreateOperationRequestDTO = {
      pacientid: 'p3',
      doctorid: 'd3',
      operationTypeId: '3',
      deadline: '2024-12-15',
      priority: 'urgent',
    };

    service.createItem(newRequest).subscribe((response) => {
      expect(response).toEqual(newRequest);
    });

    const req = httpMock.expectOne('http://fakeapi.com/operations/create');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newRequest);
    req.flush(newRequest); // Simula a resposta da API
  });

  it('should update an operation request', () => {
    const updatedRequest: UpdateOperationRequestDTO = {
      deadline: '2024-12-20',
      priority: 'High',
    };
    const id = '1';

    service.updateItem(id, updatedRequest).subscribe((response) => {
      expect(response).toEqual(updatedRequest);
    });

    const req = httpMock.expectOne(`http://fakeapi.com/operations/update/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedRequest);
    req.flush(updatedRequest); // Simula a resposta da API
  });

});
