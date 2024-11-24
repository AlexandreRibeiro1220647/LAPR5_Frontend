import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { OperationTypeComponent } from './operation-type.component';
import { OperationTypesService } from '../../../services/operation-types/operation-types.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { OperationType } from '../../../models/operation-types/operationType';
import { CreateOperationTypeDTO } from '../../../models/operation-types/createOperationTypeDTO';
import { UpdateOperationTypeDTO } from '../../../models/operation-types/updateOperationTypeDTO';
import { SearchOperationTypeDTO } from '../../../models/operation-types/searchOperationTypeDTO';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OperationTypeComponent', () => {
  let component: OperationTypeComponent;
  let fixture: ComponentFixture<OperationTypeComponent>;
  let operationTypesServiceSpy: jasmine.SpyObj<OperationTypesService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const operationTypesServiceMock = jasmine.createSpyObj('OperationTypesService', [
      'getItems',
      'createItem',
      'updateItem',
      'deleteItem',
      'searchItems',
    ]);

    operationTypesServiceMock.getItems.and.returnValue(of([])); // Mock observable return
    operationTypesServiceMock.createItem.and.returnValue(of({}));
    operationTypesServiceMock.updateItem.and.returnValue(of({}));
    operationTypesServiceMock.deleteItem.and.returnValue(of({}));
    operationTypesServiceMock.searchItems.and.returnValue(of([]));

    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        OperationTypeComponent,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        BrowserAnimationsModule, // Add this line to enable animations
      ],
      providers: [
        { provide: OperationTypesService, useValue: operationTypesServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        LiveAnnouncer,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationTypeComponent);
    component = fixture.componentInstance;
    operationTypesServiceSpy = TestBed.inject(OperationTypesService) as jasmine.SpyObj<OperationTypesService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(OperationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load operation types on initialization', () => {
    const mockData: OperationType[] = [
      { operationTypeId: "1", name: 'Type 1', requiredStaffBySpecialization: [], estimatedDuration: [], isActive: true },
    ];
    operationTypesServiceSpy.getItems.and.returnValue(of(mockData));

    component.ngOnInit();

    expect(operationTypesServiceSpy.getItems).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockData);
  });

  it('should handle error when loading operation types', () => {
    operationTypesServiceSpy.getItems.and.returnValue(throwError(() => new Error('API error')));

    spyOn(console, 'error');
    component.ngOnInit();

    expect(operationTypesServiceSpy.getItems).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error fetching operation types', jasmine.any(Error));
  });

  it('should open create dialog and handle creation', () => {

    const mockResult: CreateOperationTypeDTO = { name: 'New Type', requiredStaffBySpecialization: [], estimatedDuration: [] };
    const dialogRefMock = { afterClosed: () => of(mockResult) } as MatDialogRef<any>;
    dialogSpy.open.and.returnValue(dialogRefMock);

    operationTypesServiceSpy.createItem.and.returnValue(of({
      name: 'Mock Operation',
      requiredStaffBySpecialization: [],
      estimatedDuration: [],
    } as CreateOperationTypeDTO));

    component.openCreateDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(operationTypesServiceSpy.createItem).toHaveBeenCalledWith(mockResult);
  });

  it('should open edit dialog and handle update', () => {
    const mockUpdateData: UpdateOperationTypeDTO = { name: 'Updated Type', requiredStaffBySpecialization: ['1 do'], estimatedDuration: ['12'] };
    const mockSelectedRow: OperationType = { operationTypeId: "1", name: 'Type 1', requiredStaffBySpecialization: ['oo'], estimatedDuration: ['10'], isActive: true };
    const dialogRefMock = { afterClosed: () => of(mockUpdateData) } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRefMock);
    component.selection.select(mockSelectedRow); // Simulate row selection
    operationTypesServiceSpy.updateItem.and.returnValue(of({}));

    component.openEditDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(operationTypesServiceSpy.updateItem).toHaveBeenCalledWith(mockSelectedRow.operationTypeId, mockUpdateData);
  });

  it('should handle no row selected in edit dialog', () => {
    const dialogRefMock = { afterClosed: () => of({}) } as MatDialogRef<any>;
    dialogSpy.open.and.returnValue(dialogRefMock);

    spyOn(console, 'log');
    component.openEditDialog();

    expect(console.log).toHaveBeenCalledWith('No row selected');
  });

  it('should clean payload properly', () => {
    const originalData = { name: 'Old Name', requiredStaffBySpecialization: [], estimatedDuration: [] };
    const newData = { name: '', requiredStaffBySpecialization: [], estimatedDuration: [] };

    const cleanedData = component.cleanPayload(newData, originalData);

    expect(cleanedData).toEqual({});
  });

  it('should handle row selection', () => {
    const mockRow: OperationType = { operationTypeId: "1", name: 'Type 1', requiredStaffBySpecialization: [], estimatedDuration: [], isActive: true };

    component.toggleSelection(mockRow);

    expect(component.selection.isSelected(mockRow)).toBeTrue();
  });

  it('should open search dialog and handle filtering', () => {
    const mockSearchData: SearchOperationTypeDTO = {
      name: 'Search',
      requiredStaffBySpecialization: [],
      estimatedDuration: [],
      status: true, // Use a boolean value here if that's the expected type
    };
    const mockFilteredData: OperationType[] = [
      { operationTypeId: "1", name: 'Type 1', requiredStaffBySpecialization: [], estimatedDuration: [], isActive: true },
    ];
    const dialogRefMock = { afterClosed: () => of(mockSearchData) } as MatDialogRef<any>;

    dialogSpy.open.and.returnValue(dialogRefMock);
    operationTypesServiceSpy.searchItems.and.returnValue(of(mockFilteredData));

    component.openSearchDialog();

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(operationTypesServiceSpy.searchItems).toHaveBeenCalledWith(mockSearchData);
    expect(component.dataSource.data).toEqual(mockFilteredData);
  });
});
