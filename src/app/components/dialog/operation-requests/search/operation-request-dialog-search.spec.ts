import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OperationRequestSearchDialogComponent } from './operation-request-dialog-search';

describe('OperationRequestSearchDialogComponent', () => {
  let component: OperationRequestSearchDialogComponent;
  let fixture: ComponentFixture<OperationRequestSearchDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<OperationRequestSearchDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule, // Evita problemas com animações do Angular Material
        OperationRequestSearchDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationRequestSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.operationForm.value;
    expect(formValue).toEqual({
      patientName: '',
      patientId: '',
      operationTypeName: '',
      priority: '',
      deadline: ''
    });
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog if the form is not complete on submit', () => {
    const data = {
      patientName: '',
      patientId: '12345',
      operationTypeName: '10',
      priority: 'Urgent',
      deadline: ''
    };
    component.operationForm.setValue(data); // Form inválido
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(data);
  });

  it('should close the dialog with form data when onSubmit is called and form is valid', () => {
    const validData = {
      patientName: 'Jane Doe',
      patientId: '12345',
      operationTypeName: '10',
      priority: 'Urgent',
      deadline: '2024-12-31'
    };

    component.operationForm.setValue(validData);
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(validData);
  });
});
