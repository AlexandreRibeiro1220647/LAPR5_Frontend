import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SignUpDialogComponent } from './sign-up-dialog.component';
import { CreatePatientDTO } from '../../../../models/patient/createPatientDTO';

describe('SignUpDialogComponent', () => {
  let component: SignUpDialogComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<SignUpDialogComponent>>;

  beforeEach(() => {
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<SignUpDialogComponent>>;
    component = new SignUpDialogComponent(fb, dialogRefSpy);
  });

  it('should initialize the form with empty fields', () => {
    expect(component.patientForm).toBeDefined();
    expect(component.patientForm.value).toEqual({
      fullName: '',
      dateOfBirth: '',
      gender: '',
      contactInformation: '',
      email: '',
      medicalConditions: '',
      emergencyContact: '',
      appointmentHistory: '',
    });
  });

  it('should call dialogRef.close when onCancel is invoked', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalledWith();
  });

  it('should submit valid form data as CreatePatientDTO', () => {
    component.patientForm.setValue({
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      contactInformation: '123-456-7890',
      email: 'john.doe@example.com',
      medicalConditions: 'Diabetes, Hypertension',
      emergencyContact: 'Jane Doe',
      appointmentHistory: 'Checkup 2021-05-10, Consultation 2021-06-15',
    });

    component.onSubmit();

    const expectedData: CreatePatientDTO = {
      fullName: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      contactInformation: '123-456-7890',
      email: 'john.doe@example.com',
      medicalConditions: ['Diabetes', 'Hypertension'],
      emergencyContact: 'Jane Doe',
      appointmentHistory: ['Checkup 2021-05-10', 'Consultation 2021-06-15'],
    };

    expect(dialogRefSpy.close).toHaveBeenCalledWith(expectedData);
  });

});
