import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AlgavService } from './algav.service';  // Update the path as needed
import { ReturnToken } from '../../models/operation-schedules/returnToken'; // Update path if needed

describe('AlgavService', () => {
  let service: AlgavService;
  let httpMock: HttpTestingController;

  const mockPlanningUrl = 'http://mock-planning-url.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule to mock HTTP requests
      providers: [
        AlgavService,
        { provide: 'PLANNING_URL', useValue: mockPlanningUrl } // Provide the mock planning URL
      ]
    });

    service = TestBed.inject(AlgavService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensures that there are no outstanding requests after each test
    httpMock.verify();
  });

  it('should call getItems and return expected data', () => {
    const mockReturnToken: ReturnToken = {
      ag_op_room_better: [
        ['08:00', '09:00', 'Op123'], // Slot 1
        ['09:00', '10:00', 'Op124']  // Slot 2
      ],
      lag_doctors_better: [
        [ // Doctor 1
          ['08:00', '09:00', 'Task1'], // Slot 1
          ['09:00', '10:00', 'Task2']  // Slot 2
        ],
        [ // Doctor 2
          ['08:30', '09:30', 'Task3'], // Slot 1
          ['09:30', '10:30', 'Task4']  // Slot 2
        ]
      ]
    };

    const operationRoomId = 'OR123';
    const date = 20241124;

    service.getItems(operationRoomId, date).subscribe((response) => {
      expect(response).toEqual(mockReturnToken);  // Test the returned data
    });

    const req = httpMock.expectOne(`${mockPlanningUrl}/obtain_better_solution?or=${operationRoomId}&date=${date}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReturnToken);  // Return the mock response
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
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' }); // Simulate server error
  });
});
