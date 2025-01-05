import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AllergiesDialogComponent } from './allergies-dialog-edit.component';

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
        NoopAnimationsModule, // Para evitar problemas com animações do Angular Material
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
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      code: 'A001',
      designation: 'Peanuts',
      description: 'Allergy to peanuts',
    });
  });

});
