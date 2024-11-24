import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StaffService } from './staff.service';
import { CreateStaffDTO } from '../../models/staff/createStaffDTO';
import { UpdateStaffDto } from '../../models/staff/updateStaffDTO';
import { SearchStaffDTO } from '../../models/staff/searchStaffDTO';
import { Staff } from '../../models/staff/staff';
import { StaffStatus } from '../../models/staff/staffstatus';

describe('StaffService', () => {
  let service: StaffService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://mock-api.com';
  const mockToken = 'mock-token';

  beforeEach(() => {
    spyOn(sessionStorage, 'getItem').and.returnValue(mockToken);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StaffService,
        { provide: 'API_URL', useValue: mockApiUrl },
      ],
    });

    service = TestBed.inject(StaffService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get staff members', () => {
    const mockStaff: Staff[] = [
      { licenseNumber: '1', specialization: 'Cardiology', phone: '123456789', availabilitySlots: [], status: StaffStatus.ACTIVE, user: { id: '1', name: 'John Doe', email: { value: 'john.doe@example.com' }, role: 'Doctor' } },
      { licenseNumber: '2', specialization: 'Dermatology', phone: '987654321', availabilitySlots: [], status: StaffStatus.INACTIVE, user: { id: '2', name: 'Jane Doe', email: { value: 'jane.doe@example.com' }, role: 'Nurse' } },
    ];

    service.getStaff().subscribe((staff) => {
      expect(staff.length).toBe(2);
      expect(staff).toEqual(mockStaff);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/staff`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStaff);
  });

  it('should create a staff member', () => {
    const newStaff: CreateStaffDTO = {
      specialization: 'Cardiology',
      phone: '123456789',
      availabilitySlots: [],
      status: StaffStatus.ACTIVE, // Enum utilizado
      user: { id: '3', name: 'Mark Smith', email: { value: 'mark.smith@example.com' }, role: 'Doctor' },
    };

    service.createStaff(newStaff).subscribe((createdStaff) => {
      expect(createdStaff.specialization).toBe('Cardiology');
    });

    const req = httpMock.expectOne(`${mockApiUrl}/staff/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStaff);
    req.flush(newStaff);
  });

  it('should update a staff member', () => {
    const updatedStaff: UpdateStaffDto = {
      phone: '123456789',
      specialization: 'Neurology',
      availabilitySlots: [],
      status: StaffStatus.ACTIVE, // Enum utilizado
      user: { id: '1', name: 'John Doe', email: { value: 'john.doe@example.com' }, role: 'Doctor' },
    };
    const staffId = '1';

    service.updateStaff(staffId, updatedStaff).subscribe((response) => {
      expect(response.specialization).toBe('Neurology');
    });

    const req = httpMock.expectOne(`${mockApiUrl}/staff/update/${staffId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStaff);
    req.flush(updatedStaff);
  });

  it('should inactivate a staff member', () => {
    const staffId = '1';
    const mockStaff: Staff = {
      licenseNumber: '1',
      specialization: 'Cardiology',
      phone: '123456789',
      availabilitySlots: [],
      status: StaffStatus.INACTIVE, // Enum utilizado
      user: { id: '1', name: 'John Doe', email: { value: 'john.doe@example.com' }, role: 'Doctor' },
    };

    service.inactivateStaff(staffId, mockStaff).subscribe((response) => {
      expect(response.status).toBe(StaffStatus.INACTIVE);
    });

    const req = httpMock.expectOne(`${mockApiUrl}/api/staff/${staffId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toEqual(mockStaff);
    req.flush(mockStaff);
  });

  it('should search staff members', () => {
    const filter: SearchStaffDTO = { specialization: 'Cardiology', user: { id: '', name: 'John', email: { value: '' }, role: '' } };
    const mockSearchResults: Staff[] = [
      { licenseNumber: '1', specialization: 'Cardiology', phone: '123456789', availabilitySlots: [], status: StaffStatus.ACTIVE, user: { id: '1', name: 'John Doe', email: { value: 'john.doe@example.com' }, role: 'Doctor' } },
    ];

    service.searchItems(filter).subscribe((staff) => {
      expect(staff.length).toBe(1);
      expect(staff).toEqual(mockSearchResults);
    });

    const req = httpMock.expectOne((req) => req.url === `${mockApiUrl}/staff/search`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('specialization')).toBe('Cardiology');
    expect(req.request.params.get('fullName')).toBe('John');
    req.flush(mockSearchResults);
  });
});
