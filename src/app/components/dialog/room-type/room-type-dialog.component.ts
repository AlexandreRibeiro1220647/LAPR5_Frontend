import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import { CreateRoomTypeDTO } from '../../../models/room-types/createRoomTypeDTO';

@Component({
  selector: 'app-room-types-dialog',
  templateUrl: './room-type-dialog.component.html',
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
export class RoomTypesDialogComponent {
  roomTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RoomTypesDialogComponent>
  ) {
    this.roomTypeForm = this.fb.group({
      roomDesignation: [''],
      roomDescription: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.roomTypeForm.valid) {
      // Convert form data into an OperationType object
      const roomTypeData: CreateRoomTypeDTO = {
        roomDesignation: this.roomTypeForm.value.roomDesignation,
        roomDescription: this.roomTypeForm.value.roomDescription,
      };
      this.dialogRef.close(roomTypeData); // Send OperationType object back to main component
    }
  }
}
