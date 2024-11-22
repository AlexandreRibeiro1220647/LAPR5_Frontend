import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {OpScheduleParametersDTO} from '../../../models/operation-schedules/OpScheduleParametersDTO';

@Component({
  selector: 'app-operation-room-schedules-dialog',
  templateUrl: './operation-room-schedules-dialog.component.html',
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
export class OperationRoomSchedulesDialogComponent {
  operationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OperationRoomSchedulesDialogComponent>
  ) {
    this.operationForm = this.fb.group({
      opRoomId: [''],
      date: [null],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.operationForm.valid) {
      console.log("dialog:", this.operationForm.value.opRoomId);
      // Convert form data into an OperationType object
      const operationData: OpScheduleParametersDTO = {
        opRoomId: this.operationForm.value.opRoomId,
        date: Number(this.operationForm.value.date),
      };
      this.dialogRef.close(operationData); // Send OperationType object back to main component
    }
  }
}
