import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffDialogComponent } from './staff-dialog.component';
import { CreateStaffDTO } from '../../../../models/staff/createStaffDTO';
import { StaffStatus } from '../../../../models/staff/staffstatus';
import { Slot } from '../../../../models/staff/slot';

describe('StaffDialogComponent', () => {
  let component: StaffDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<StaffDialogComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const mockDialogData: CreateStaffDTO = {
      specialization: 'Cardiology',
      phone: '123456789',
      availabilitySlots: [
        { startTime: new Date('2024-01-01T08:00:00'), endTime: new Date('2024-01-01T10:00:00') } as Slot,
      ],
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
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<StaffDialogComponent>>;
    const dialogData = TestBed.inject(MAT_DIALOG_DATA);

    component = new StaffDialogComponent(fb, dialogRefSpy, dialogData);
  });

  it('deve inicializar o formulário com dados fornecidos', () => {
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

  it('deve adicionar um novo slot de disponibilidade', () => {
    const initialLength = component.availabilitySlots.length;
    component.addSlot();
    expect(component.availabilitySlots.length).toBe(initialLength + 1);
    expect(component.availabilitySlots.at(initialLength).value).toEqual({
      startTime: '',
      endTime: '',
    });
  });

  it('deve remover um slot de disponibilidade pelo índice', () => {
    const initialLength = component.availabilitySlots.length;
    component.removeSlot(0);
    expect(component.availabilitySlots.length).toBe(initialLength - 1);
  });

  it('deve chamar dialogRef.close ao cancelar', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('não deve enviar dados ao submeter formulário inválido', () => {
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
