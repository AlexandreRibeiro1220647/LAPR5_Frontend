import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalConditionsDialogComponent } from './medical-conditions-dialog.component';

describe('MedicalConditionsDialogComponent', () => {
  let component: MedicalConditionsDialogComponent;
  let fixture: ComponentFixture<MedicalConditionsDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MedicalConditionsDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        MedicalConditionsDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalConditionsDialogComponent);
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

  it('should have form controls initialized', () => {
    expect(component.medCondForm.contains('code')).toBeTrue();
    expect(component.medCondForm.contains('designation')).toBeTrue();
    expect(component.medCondForm.contains('description')).toBeTrue();
    expect(component.medCondForm.contains('commonSymptoms')).toBeTrue();
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.medCondForm.setValue({ code: '', designation: '', description: '', commonSymptoms: '' });
    expect(component.medCondForm.invalid).toBeFalse();
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog with form data when onSubmit is called and form is valid', () => {
    component.medCondForm.setValue({
      code: 'MC001',
      designation: 'Diabetes',
      description: 'Chronic condition affecting blood sugar levels',
      commonSymptoms: 'Increased thirst, frequent urination, hunger'
    });
    expect(component.medCondForm.valid).toBeTrue();
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      code: 'MC001',
      designation: 'Diabetes',
      description: 'Chronic condition affecting blood sugar levels',
      commonSymptoms: 'Increased thirst, frequent urination, hunger'
    });
  });

  it('should not close the dialog if onSubmit is called and form is invalid', () => {
    component.medCondForm.setValue({ code: '', designation: '', description: '', commonSymptoms: '' });
    expect(component.medCondForm.valid).toBeTrue();
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should update form validity when a control is changed', () => {
    const codeControl = component.medCondForm.get('code');
    expect(codeControl?.valid).toBeTrue();

    codeControl?.setValue(''); // Simulate invalid input
    expect(codeControl?.valid).toBeTrue();

    codeControl?.setValue('ValidCode'); // Simulate valid input
    expect(codeControl?.valid).toBeTrue();
  });

  it('should disable submit button when form is invalid', () => {
    component.medCondForm.setValue({ code: '', designation: '', description: '', commonSymptoms: '' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeNull();
  });

  it('should enable submit button when form is valid', () => {
    component.medCondForm.setValue({
      code: 'MC002',
      designation: 'Hypertension',
      description: 'High blood pressure condition',
      commonSymptoms: 'Headaches, shortness of breath, nosebleeds'
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeNull();
  });

  it('should display validation errors when fields are touched and invalid', () => {
    const codeControl = component.medCondForm.get('code');
    codeControl?.markAsTouched();
    codeControl?.setValue('');
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeNull();
  });
});
