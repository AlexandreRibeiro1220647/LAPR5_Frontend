import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { UpdateOperationRequestDTO } from '../../../../models/operation-requests/updateOperationRequestDTO';

@Component({
  selector: 'app-operation-requests-dialog-edit',
  templateUrl: './operation-request-dialog-edit.html',
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
export class OperationRequestDialogEdit {
  operationRequestForm: FormGroup;
  priorityOptions = ['Elective', 'Urgent', 'Emergency']; // Opções de prioridade para o dropdown

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OperationRequestDialogEdit>
  ) {
    this.operationRequestForm = this.fb.group({
      priority: [''],
      deadline: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.operationRequestForm.valid) {
      // Convert form data into an OperationRequest object
      const operationRequestData: UpdateOperationRequestDTO = {
        priority: this.operationRequestForm.value.priority,
        deadline: this.operationRequestForm.value.deadline
      };
      this.dialogRef.close(operationRequestData); // Send OperationRequest object back to main component
    }
  }
}
