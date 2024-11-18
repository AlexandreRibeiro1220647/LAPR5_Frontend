import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {SearchOperationRequestDTO} from '../../../../models/operation-requests/searchOperationRequestsDTO';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-operation-types-search-dialog',
  templateUrl: './operation-request-dialog-search.html',
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatSelectModule,
    MatFormFieldModule
  ],
  standalone: true
})
export class OperationRequestSearchDialogComponent {
  operationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OperationRequestSearchDialogComponent>
  ) {
    this.operationForm = this.fb.group({
      patientName: [''],
      patientId: [''],
      operationTypeId: [''],
      priority: [''],
      deadline: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.operationForm.valid) {
      // Convert form data into an OperationType object
      const operationData: SearchOperationRequestDTO = {
        patientName: this.operationForm.value.patientName,
        patientId: this.operationForm.value.patientId,
        operationTypeId: this.operationForm.value.operationTypeId,
        priority: this.operationForm.value.priority,
        deadline: this.operationForm.value.deadline,
      };
      this.dialogRef.close(operationData); // Send OperationType object back to main component
    }
  }
}
