import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MedicalConditionsSearchDialogComponent } from './medical-conditions-dialog-search.component';

describe('MedicalConditionsSearchDialogComponent', () => {
  let component: MedicalConditionsSearchDialogComponent;
  let fixture: ComponentFixture<MedicalConditionsSearchDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<MedicalConditionsSearchDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        NoopAnimationsModule, // Evita problemas com animações do Angular Material
        MedicalConditionsSearchDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalConditionsSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.medicalConditionsForm.value;
    expect(formValue).toEqual({
      code: '',
      designation: ''
    });
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog with form data when onSubmit is called and form is valid', () => {
    const validData = {
      code: 'M001',
      designation: 'Diabetes'
    };
    component.medicalConditionsForm.setValue(validData); // Configura valores válidos
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(validData);
  });
});
