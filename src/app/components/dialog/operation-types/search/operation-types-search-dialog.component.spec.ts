import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OperationTypesSearchDialogComponent } from './operation-types-search-dialog.component';
import { SearchOperationTypeDTO } from '../../../../models/operation-types/searchOperationTypeDTO';

describe('OperationTypesSearchDialogComponent', () => {
  let component: OperationTypesSearchDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<OperationTypesSearchDialogComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<OperationTypesSearchDialogComponent>>;
    component = new OperationTypesSearchDialogComponent(fb, dialogRefSpy);
  });

  it('should initialize the form with empty fields', () => {
    expect(component.operationForm).toBeDefined();
    expect(component.operationForm.value).toEqual({
      name: '',
      requiredStaffBySpecialization: '',
      estimatedDuration: '',
      status: '',
    });
  });

  it('should call dialogRef.close when onCancel is invoked', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should submit valid form data as SearchOperationTypeDTO', () => {
    component.operationForm.setValue({
      name: 'Operation C',
      requiredStaffBySpecialization: 'Supervisor, Engineer',
      estimatedDuration: '1h, 15m',
      status: true,
    });

    component.onSubmit();

    const expectedData: SearchOperationTypeDTO = {
      name: 'Operation C',
      requiredStaffBySpecialization: ['Supervisor', 'Engineer'],
      estimatedDuration: ['1h', '15m'],
      status: true,
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedData);
  });

});
