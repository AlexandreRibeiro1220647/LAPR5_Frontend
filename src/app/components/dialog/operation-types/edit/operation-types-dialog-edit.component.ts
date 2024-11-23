import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {UpdateOperationTypeDTO} from '../../../../models/operation-types/updateOperationTypeDTO';

@Component({
  selector: 'app-operation-types-dialog-edit',
  templateUrl: './operation-types-dialog-edit.component.html',
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatFormFieldModule
  ],
  standalone: true
})
export class OperationTypesDialogEditComponent {
  operationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OperationTypesDialogEditComponent>
  ) {
    this.operationForm = this.fb.group({
      name: [''],
      requiredStaffBySpecialization: [''],
      estimatedDuration: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.operationForm.valid) {
      // Convert form data into an OperationType object
      const operationData: UpdateOperationTypeDTO = {
        name: this.operationForm.value.name,
        requiredStaffBySpecialization: this.operationForm.value.requiredStaffBySpecialization.split(',').map((s: string) => s.trim()),
        estimatedDuration: this.operationForm.value.estimatedDuration.split(',').map((s: string) => s.trim()),
      };
      this.dialogRef.close(operationData); // Send OperationType object back to main component
    }
  }
}
