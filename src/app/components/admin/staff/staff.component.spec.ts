import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffComponente } from './staff.component';
import { StaffService } from '../../../services/staff/staff.service';
import { of, throwError } from 'rxjs';
import { Staff } from '../../../models/staff/staff';
import { CreateStaffDTO } from '../../../models/staff/createStaffDTO';
import { UpdateStaffDto } from '../../../models/staff/updateStaffDTO';
import { SearchStaffDTO } from '../../../models/staff/searchStaffDTO';
import { StaffStatus } from '../../../models/staff/staffstatus';

describe('StaffComponent', () => {
  let component: StaffComponente;
  let fixture: ComponentFixture<StaffComponente>;
  let staffServiceSpy: jasmine.SpyObj<StaffService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const staffServiceMock = jasmine.createSpyObj('StaffService', [
      'getStaff',
      'createStaff',
      'updateStaff',
      'searchItems',
      'inactivateStaff',
    ]);
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [StaffComponente],
      providers: [
        { provide: StaffService, useValue: staffServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffComponente);
    component = fixture.componentInstance;
    staffServiceSpy = TestBed.inject(StaffService) as jasmine.SpyObj<StaffService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load staff on initialization', () => {
    const mockStaff: Staff[] = [
      {
        licenseNumber: '12345',
        specialization: 'Cardiology',
        phone: '123456789',
        availabilitySlots: [],
        status: StaffStatus.ACTIVE,
        user: {
          id: '1',
          name: 'John Doe',
          email: { value: 'john.doe@example.com' },
          role: 'Doctor',
        },
      },
    ];
    staffServiceSpy.getStaff.and.returnValue(of(mockStaff));

    component.ngOnInit();

    expect(staffServiceSpy.getStaff).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockStaff);
  });

  it('should handle error when loading staff', () => {
    staffServiceSpy.getStaff.and.returnValue(throwError(() => new Error('API error')));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(staffServiceSpy.getStaff).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error loading staff:', jasmine.any(Error));
  });

  it('should open create dialog and handle creation', () => {
    const mockResult: CreateStaffDTO = {
      specialization: 'Dermatology',
      phone: '987654321',
      availabilitySlots: [],
      status: StaffStatus.ACTIVE,
      user: {
        id: '2',
        name: 'Jane Doe',
        email: { value: 'jane.doe@example.com' },
        role: 'Nurse',
      },
    };
    const dialogRefMock = { afterClosed: () => of(mockResult) } as MatDialogRef<any>;
    dialogSpy.open.and.returnValue(dialogRefMock);

    staffServiceSpy.createStaff.and.returnValue(of(mockResult));

    component.openCreateDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(staffServiceSpy.createStaff).toHaveBeenCalledWith(mockResult);
  });

  it('should open edit dialog and handle update', () => {
    const mockUpdateData: UpdateStaffDto = {
      phone: '987654321',
      specialization: 'Dermatology',
      availabilitySlots: [],
      status: StaffStatus.ACTIVE,
      user: {
        id: '1',
        name: 'Jane Doe',
        email: { value: 'jane.doe@example.com' },
        role: 'Nurse',
      },
    };
    const mockSelectedStaff: Staff = {
      licenseNumber: '12345',
      specialization: 'Cardiology',
      phone: '123456789',
      availabilitySlots: [],
      status: StaffStatus.ACTIVE,
      user: {
        id: '1',
        name: 'Jane Doe',
        email: { value: 'jane.doe@example.com' },
        role: 'Nurse',
      },
    };
    const dialogRefMock = { afterClosed: () => of(mockUpdateData) } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRefMock);
    component.selection.select(mockSelectedStaff);

    staffServiceSpy.updateStaff.and.returnValue(of(mockUpdateData));

    component.openEditDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(staffServiceSpy.updateStaff).toHaveBeenCalledWith(mockSelectedStaff.licenseNumber, mockUpdateData);
  });

  it('should handle inactivation of staff', () => {
    const mockSelectedStaff: Staff = {
      licenseNumber: '12345',
      specialization: 'Cardiology',
      phone: '123456789',
      availabilitySlots: [],
      status: StaffStatus.ACTIVE,
      user: {
        id: '1',
        name: 'Jane Doe',
        email: { value: 'jane.doe@example.com' },
        role: 'Nurse',
      },
    };
    component.selection.select(mockSelectedStaff);

    staffServiceSpy.inactivateStaff.and.returnValue(of(mockSelectedStaff));

    component.inactivateStaff();

    expect(staffServiceSpy.inactivateStaff).toHaveBeenCalledWith(mockSelectedStaff.licenseNumber, jasmine.any(Object));
  });

  it('should open search dialog and handle filtering', () => {
    const mockSearchData: SearchStaffDTO = {
      specialization: 'Cardiology',
      phone: '123456789',
      status: StaffStatus.ACTIVE,
      user: {
        id: '1',
        name: 'John Doe',
        email: { value: 'john.doe@example.com' },
        role: 'Doctor',
      },
    };
    const mockFilteredData: Staff[] = [
      {
        licenseNumber: '12345',
        specialization: 'Cardiology',
        phone: '123456789',
        availabilitySlots: [],
        status: StaffStatus.ACTIVE,
        user: {
          id: '1',
          name: 'John Doe',
          email: { value: 'john.doe@example.com' },
          role: 'Doctor',
        },
      },
    ];
    const dialogRefMock = { afterClosed: () => of(mockSearchData) } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRefMock);
    staffServiceSpy.searchItems.and.returnValue(of(mockFilteredData));

    component.openSearchDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(staffServiceSpy.searchItems).toHaveBeenCalledWith(mockSearchData);
    expect(component.dataSource.data).toEqual(mockFilteredData);
  });
});
