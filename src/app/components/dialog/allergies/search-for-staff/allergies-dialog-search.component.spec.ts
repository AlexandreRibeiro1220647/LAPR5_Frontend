import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AllergiesSearchDialogComponent } from './allergies-dialog-search.component';

describe('AllergiesSearchDialogComponent', () => {
  let component: AllergiesSearchDialogComponent;
  let fixture: ComponentFixture<AllergiesSearchDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AllergiesSearchDialogComponent>>;

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
        AllergiesSearchDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllergiesSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.allergiesForm.value;
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
      code: 'A001',
      designation: 'Peanut Allergy'
    };
    component.allergiesForm.setValue(validData); // Configura valores válidos
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(validData);
  });
});
