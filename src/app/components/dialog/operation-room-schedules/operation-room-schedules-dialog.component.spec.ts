import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { OperationRoomSchedulesDialogComponent } from './operation-room-schedules-dialog.component';
import { OpScheduleParametersDTO } from '../../../models/operation-schedules/OpScheduleParametersDTO';

describe('OperationRoomSchedulesDialogComponent', () => {
  let component: OperationRoomSchedulesDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<OperationRoomSchedulesDialogComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<OperationRoomSchedulesDialogComponent>>;
    component = new OperationRoomSchedulesDialogComponent(fb, dialogRefSpy);
  });

  it('should initialize the form with empty fields', () => {
    expect(component.operationForm).toBeDefined();
    expect(component.operationForm.value).toEqual({
      opRoomId: '',
      date: null,
    });
  });

  it('should call dialogRef.close when onCancel is invoked', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should submit valid form data as OpScheduleParametersDTO', () => {
    component.operationForm.setValue({
      opRoomId: '123',
      date: '1680998400000',
    });

    component.onSubmit();

    const expectedData: OpScheduleParametersDTO = {
      opRoomId: '123',
      date: 1680998400000,
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedData);
  });
});
