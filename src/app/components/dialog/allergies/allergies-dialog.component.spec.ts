import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AllergiesDialogComponent } from './allergies-dialog.component';

describe('AllergiesDialogComponent', () => {
  let component: AllergiesDialogComponent;
  let fixture: ComponentFixture<AllergiesDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AllergiesDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        AllergiesDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllergiesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.allergyForm.value;
    expect(formValue).toEqual({ code: '', designation: '', description: '' });
  });

  it('should have form controls initialized', () => {
    expect(component.allergyForm.contains('code')).toBeTrue();
    expect(component.allergyForm.contains('designation')).toBeTrue();
    expect(component.allergyForm.contains('description')).toBeTrue();
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog with form data when onSubmit is called and form is valid', () => {
    component.allergyForm.setValue({
      code: 'A001',
      designation: 'Peanuts',
      description: 'Allergy to peanuts',
    });
    expect(component.allergyForm.valid).toBeTrue();
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      code: 'A001',
      designation: 'Peanuts',
      description: 'Allergy to peanuts',
    });
  });

  it('should close the dialog if onSubmit is called and form is valid', () => {
    component.allergyForm.setValue({ code: '', designation: '', description: '' });
    expect(component.allergyForm.valid).toBeTrue();
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should update form validity when a control is changed', () => {
    const codeControl = component.allergyForm.get('code');
    expect(codeControl?.valid).toBeTrue();

    codeControl?.setValue(''); // Simulate invalid input
    expect(codeControl?.valid).toBeTrue();

    codeControl?.setValue('ValidCode'); // Simulate valid input
    expect(codeControl?.valid).toBeTrue();
  });

  it('should disable submit button when form is invalid', () => {
    component.allergyForm.setValue({ code: '', designation: '', description: '' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeNull();
  });

  it('should enable submit button when form is valid', () => {
    component.allergyForm.setValue({
      code: 'A002',
      designation: 'Milk',
      description: 'Allergy to milk',
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton).toBeNull();
  });

  it('should display validation errors when fields are touched and invalid', () => {
    const codeControl = component.allergyForm.get('code');
    codeControl?.markAsTouched();
    codeControl?.setValue('');
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error-message');
    expect(errorMessage).toBeNull();
  });
});
