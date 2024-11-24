import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffSearchDialogComponent } from './staff-search-dialog.component';
import { SearchStaffDTO } from '../../../../models/staff/searchStaffDTO';

describe('StaffSearchDialogComponent', () => {
  let component: StaffSearchDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<StaffSearchDialogComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const mockDialogData = {}; // Mock data for MAT_DIALOG_DATA

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }, // Add this
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<StaffSearchDialogComponent>>;
    const mockData = TestBed.inject(MAT_DIALOG_DATA);

    component = new StaffSearchDialogComponent(fb, dialogRefSpy, mockData);
  });

  it('should initialize the form with empty fields', () => {
    expect(component.staffForm).toBeDefined();
    expect(component.staffForm.value).toEqual({
      fullName: '',
      email: '',
      phone: '',
      specialization: '',
      status: '',
    });
  });

  it('should call dialogRef.close when onCancel is invoked', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should submit valid form data as SearchStaffDTO', () => {
    component.staffForm.setValue({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      specialization: 'Cardiology',
      status: 'ACTIVE',
    });

    component.onSubmit();

    const expectedData: SearchStaffDTO = {
      specialization: 'Cardiology',
      phone: '123456789',
      status: 'ACTIVE',
      user: {
        id: '',
        name: 'John Doe',
        email: { value: 'john.doe@example.com' },
        role: '',
      },
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedData);
  });

  it('should not submit invalid form data', () => {
    component.staffForm.setValue({
      fullName: '',
      email: '',
      phone: '',
      specialization: '',
      status: '',
    });

    spyOn(component, 'onSubmit').and.callThrough();

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
