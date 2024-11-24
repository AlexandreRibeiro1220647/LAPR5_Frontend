import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlgavService } from './algav.service';
import { ReturnToken } from '../../models/operation-schedules/returnToken';

describe('AlgavService', () => {
  let service: AlgavService;
  let httpMock: HttpTestingController;

  const mockPlanningUrl = 'http://mock-planning-url.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AlgavService,
        { provide: 'PLANNING_URL', useValue: mockPlanningUrl }
      ]
    });

    service = TestBed.inject(AlgavService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getItems and return expected data', () => {
    const mockReturnToken: ReturnToken = {
      ag_op_room_better: [
        ['08:00', '09:00', 'Op123'],
        ['09:00', '10:00', 'Op124']
      ],
      lag_doctors_better: [
        [
          ['08:00', '09:00', 'Task1'],
          ['09:00', '10:00', 'Task2']
        ],
        [
          ['08:30', '09:30', 'Task3'],
          ['09:30', '10:30', 'Task4']
        ]
      ]
    };

    const operationRoomId = 'OR123';
    const date = 20241124;

    service.getItems(operationRoomId, date).subscribe((response) => {
      expect(response).toEqual(mockReturnToken);
    });

    const req = httpMock.expectOne(`${mockPlanningUrl}/obtain_better_solution?or=${operationRoomId}&date=${date}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReturnToken);
  });

  it('should handle errors when the API request fails', () => {
    const operationRoomId = 'OR123';
    const date = 20241124;

    // Simulate an error response from the server
    const errorMessage = 'Something went wrong';

    service.getItems(operationRoomId, date).subscribe(
      () => fail('should have failed with an error'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${mockPlanningUrl}/obtain_better_solution?or=${operationRoomId}&date=${date}`);
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
