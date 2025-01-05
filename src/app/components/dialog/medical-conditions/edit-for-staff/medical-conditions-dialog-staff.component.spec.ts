import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalConditionsDialogComponentStaff } from './medical-conditions-dialog-staff.component';

describe('MedicalConditionsDialogEditComponentStaff', () => {
  let component: MedicalConditionsDialogComponentStaff;
  let fixture: ComponentFixture<MedicalConditionsDialogComponentStaff>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MedicalConditionsDialogComponentStaff>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule, // Evita problemas com animações do Angular Material
        MedicalConditionsDialogComponentStaff
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalConditionsDialogComponentStaff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.medCondForm.value;
    expect(formValue).toEqual({
      code: '',
      designation: '',
      description: '',
      commonSymptoms: ''
    });
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should not close the dialog if the form is invalid on submit', () => {
    const invalidData = {
      code: '',
      designation: 'Asthma',
      description: '',
      commonSymptoms: ''
    };
    component.medCondForm.setValue(invalidData);
    component.onSubmit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close the dialog with form data when onSubmit is called and form is valid', () => {
    const validData = {
      code: 'M001',
      designation: 'Asthma',
      description: 'A condition where airways narrow and swell',
      commonSymptoms: 'Shortness of breath, wheezing, coughing'
    };
    component.medCondForm.setValue(validData);
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(validData);
  });
});
