import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OperationRequestDialogEdit } from './operation-request-dialog-edit';

describe('OperationRequestDialogEdit', () => {
  let component: OperationRequestDialogEdit;
  let fixture: ComponentFixture<OperationRequestDialogEdit>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<OperationRequestDialogEdit>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule, // Para evitar problemas com animações no Angular Material
        OperationRequestDialogEdit
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(OperationRequestDialogEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValue = component.operationRequestForm.value;
    expect(formValue).toEqual({ priority: '', deadline: '' });
  });

  it('should close the dialog without data when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close the dialog with form data when onSubmit is called and form is valid', () => {
    component.operationRequestForm.setValue({ priority: 'Urgent', deadline: '2024-12-31' });
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      priority: 'Urgent',
      deadline: '2024-12-31'
    });
  });

});
