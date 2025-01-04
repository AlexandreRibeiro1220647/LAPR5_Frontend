import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import { AllergyDTO } from '../../../../models/allergy/allergyDTO';

@Component({
  selector: 'app-allergies-dialog',
  templateUrl: './allergies-dialog-edit.component.html',
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
export class AllergiesDialogComponent {
  allergyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AllergiesDialogComponent>
  ) {
    this.allergyForm = this.fb.group({
      code: [''],
      designation: [''],
      description: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.allergyForm.valid) {
      // Convert form data into an OperationType object
      const operationData: AllergyDTO = {
        code: this.allergyForm.value.code,
        designation: this.allergyForm.value.designation,
        description: this.allergyForm.value.description,
      };
      this.dialogRef.close(operationData); // Send OperationType object back to main component
    }
  }
}
