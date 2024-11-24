import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffDialogEditComponent } from './staff-dialog-edit.component';
import { UpdateStaffDto } from '../../../../models/staff/updateStaffDTO';
import { Slot } from '../../../../models/staff/slot';
import { StaffStatus } from '../../../../models/staff/staffstatus';

describe('StaffDialogEditComponent', () => {
  let component: StaffDialogEditComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<StaffDialogEditComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const mockDialogData: UpdateStaffDto = {
      phone: '123456789',
      specialization: 'Cardiology',
      availabilitySlots: [
        { startTime: new Date('2024-01-01T08:00:00'), endTime: new Date('2024-01-01T10:00:00') },
      ] as Slot[],
      status: StaffStatus.ACTIVE,
      user: {
        id: '1',
        name: 'John Doe',
        email: { value: 'john.doe@example.com' },
        role: 'Doctor',
      },
    };

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<StaffDialogEditComponent>>;
    const dialogData = TestBed.inject(MAT_DIALOG_DATA);

    component = new StaffDialogEditComponent(fb, dialogRefSpy, dialogData);
  });

  it('should initialize the form with provided data', () => {
    expect(component.staffForm).toBeDefined();
    expect(component.staffForm.value).toEqual({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123456789',
      specialization: 'Cardiology',
      status: StaffStatus.ACTIVE,
      availabilitySlots: [
        {
          startTime: new Date('2024-01-01T08:00:00'),
          endTime: new Date('2024-01-01T10:00:00'),
        },
      ],
    });
  });

  it('should add a new availability slot', () => {
    const initialLength = component.availabilitySlots.length;
    component.addSlot();
    expect(component.availabilitySlots.length).toBe(initialLength + 1);
    expect(component.availabilitySlots.at(initialLength).value).toEqual({
      startTime: '',
      endTime: '',
    });
  });

  it('should remove an availability slot by index', () => {
    const initialLength = component.availabilitySlots.length;
    component.removeSlot(0);
    expect(component.availabilitySlots.length).toBe(initialLength - 1);
  });

  it('should call dialogRef.close when onCancel is invoked', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should not submit invalid form data', () => {
    component.staffForm.setValue({
      fullName: '',
      email: 'invalid-email',
      phone: '',
      specialization: '',
      status: StaffStatus.ACTIVE,
      availabilitySlots: [],
    });

    spyOn(component, 'onSubmit').and.callThrough();

    component.onSubmit();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});
