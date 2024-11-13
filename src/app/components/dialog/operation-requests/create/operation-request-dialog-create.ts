import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'; 
import {CreateOperationRequestDTO} from '../../../../models/operation-requests/createOperationRequestDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-operation-requests-dialog-create',
  templateUrl: './operation-request-dialog-create.html',
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatSelectModule
  ],
  standalone: true
})
export class OperationRequestDialogCreate {
  operationRequestForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OperationRequestDialogCreate>
  ) {
    this.operationRequestForm = this.fb.group({
      pacientid: [''],
      doctorid: [''],
      operationTypeId: [''],
      deadline: [''],
      priority: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.operationRequestForm.valid) {
      // Convert form data into an OperationRequest object
      const operationRequestData: CreateOperationRequestDTO = {
        pacientid: this.operationRequestForm.value.pacientid,
        doctorid: this.operationRequestForm.value.doctorid,
        operationTypeId: this.operationRequestForm.value.operationTypeId,
        deadline: this.operationRequestForm.value.deadline,
        priority: this.operationRequestForm.value.priority
      };
      this.dialogRef.close(operationRequestData); // Send OperationRequest object back to main component
    }
  }
}
