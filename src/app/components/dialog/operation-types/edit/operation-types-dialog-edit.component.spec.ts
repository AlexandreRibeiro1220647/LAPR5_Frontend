import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OperationTypesDialogEditComponent } from './operation-types-dialog-edit.component';
import { UpdateOperationTypeDTO } from '../../../../models/operation-types/updateOperationTypeDTO';

describe('OperationTypesDialogEditComponent', () => {
  let component: OperationTypesDialogEditComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<OperationTypesDialogEditComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<OperationTypesDialogEditComponent>>;
    component = new OperationTypesDialogEditComponent(fb, dialogRefSpy);
  });

  it('should initialize the form with empty fields', () => {
    expect(component.operationForm).toBeDefined();
    expect(component.operationForm.value).toEqual({
      name: '',
      requiredStaffBySpecialization: '',
      estimatedDuration: '',
    });
  });

  it('should call dialogRef.close when onCancel is invoked', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should submit valid form data as UpdateOperationTypeDTO', () => {
    component.operationForm.setValue({
      name: 'Operation B',
      requiredStaffBySpecialization: 'Technician, Assistant',
      estimatedDuration: '3h, 45m',
    });

    component.onSubmit();

    const expectedData: UpdateOperationTypeDTO = {
      name: 'Operation B',
      requiredStaffBySpecialization: ['Technician', 'Assistant'],
      estimatedDuration: ['3h', '45m'],
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedData);
  });
});
