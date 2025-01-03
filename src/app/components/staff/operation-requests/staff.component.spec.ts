import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';
import { OperationRequestService } from '../../../services/operation-requests/operation-requests.service';
import { OperationRequest } from '../../../models/operation-requests/operationRequest';
import { OperationType } from '../../../models/operation-types/operationType';
import { Patient } from '../../../models/patient/patient';
import { Staff } from '../../../models/staff/staff';
import { SearchOperationRequestDTO } from '../../../models/operation-requests/searchOperationRequestsDTO';
import { StaffComponentOperations } from './staff.component-operations';

// Mock Service
class MockOperationRequestService {
  getItems = jasmine.createSpy('getItems').and.returnValue(of([]));
  getOperationTypes = jasmine.createSpy('getOperationTypes').and.returnValue(of([]));
  getPatients = jasmine.createSpy('getPatients').and.returnValue(of([]));
  getStaff = jasmine.createSpy('getStaff').and.returnValue(of([]));
  createItem = jasmine.createSpy('createItem').and.returnValue(of({}));
  updateItem = jasmine.createSpy('updateItem').and.returnValue(of({}));
  deleteItem = jasmine.createSpy('deleteItem').and.returnValue(of({}));
  searchItems = jasmine.createSpy('searchItems').and.returnValue(of([]));
}

// Mock MatDialog
class MockMatDialog {
  open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(undefined),
  });
}

describe('StaffComponent', () => {
  let component: StaffComponentOperations;
  let fixture: ComponentFixture<StaffComponentOperations>;
  let mockService: MockOperationRequestService;
  let mockDialog: MockMatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, StaffComponentOperations],
      providers: [
        { provide: OperationRequestService, useClass: MockOperationRequestService },
        { provide: MatDialog, useClass: MockMatDialog }
      ]
    }).compileComponents();

    mockService = TestBed.inject(OperationRequestService) as any;
    mockDialog = TestBed.inject(MatDialog) as any;


    
    fixture = TestBed.createComponent(StaffComponentOperations);
    component = fixture.componentInstance;

    // Mock ViewChild elements
    component.paginator = jasmine.createSpyObj('MatPaginator', ['']);
    component.sort = jasmine.createSpyObj('MatSort', ['']);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load operation requests on init', () => {
    component.ngOnInit();
    expect(mockService.getItems).toHaveBeenCalled();
  });

  it('should load operation types on init', () => {
    component.ngOnInit();
    expect(mockService.getOperationTypes).toHaveBeenCalled();
  });

  it('should load patients on init', () => {
    component.ngOnInit();
    expect(mockService.getPatients).toHaveBeenCalled();
  });

  it('should load staff on init', () => {
    component.ngOnInit();
    expect(mockService.getStaff).toHaveBeenCalled();
  });

  it('should open create dialog and handle result', () => {
    component.openCreateDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open edit dialog and handle result', () => {
    const mockOperationRequest: OperationRequest = { operationId: '1', patientId: '12345',  doctorId: "d1" ,operationTypeId: '10',    priority: 'Urgent',    deadline: '2024-12-31'};
    component.selection.select(mockOperationRequest);
    component.openEditDialog();
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should clean payload properly', () => {
    const originalData = { priority: 'Elective', deadline: '2024-01-01' };
    const updatedData = { priority: '', deadline: '' };
    const cleaned = component.cleanPayload(updatedData, originalData);
    expect(cleaned).toEqual({});
  });

  it('should delete selected operation request', () => {
    const mockOperationRequest: OperationRequest = { operationId: '2', patientId: '12345',  doctorId: "d2" ,operationTypeId: '10',    priority: 'Urgent',    deadline: '2024-12-31'};
    component.selection.select(mockOperationRequest);
    component.selection.select(mockOperationRequest);
    component.deleteOperationRequest();
    expect(mockService.deleteItem).toHaveBeenCalledWith('2');
  });

  it('should open search dialog and handle filtering', () => {
    const mockSearchData: SearchOperationRequestDTO = {
      patientName: '',
      patientId: '',
      operationTypeName: '',
      priority: 'Urgent', 
      deadline: ''
    };
  
    const mockFilteredData: OperationRequest[] = [
        { operationId: '2', patientId: '12345',  doctorId: "d2" ,operationTypeId: '10',    priority: 'Urgent',    deadline: '2024-12-31'},
    ];
  
    const dialogRefMock = { afterClosed: () => of(mockSearchData) } as MatDialogRef<any>;
  
    // Simular comportamento dos serviços
    mockDialog.open.and.returnValue(dialogRefMock);
    mockService.searchItems.and.returnValue(of(mockFilteredData));
  
    component.openSearchDialog();
  
    // Verificações
    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockService.searchItems).toHaveBeenCalledWith(mockSearchData);
    expect(component.dataSource.data).toEqual(mockFilteredData);
  });
});
