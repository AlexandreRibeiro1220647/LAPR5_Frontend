import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import { MedicalConditionDTO } from '../../../../models/medical-condition/medicalConditionDTO';

@Component({
  selector: 'app-medical-conditions-dialog',
  templateUrl: './medical-conditions-dialog-staff.component.html',
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
export class MedicalConditionsDialogComponentStaff {
  medCondForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MedicalConditionsDialogComponentStaff>
  ) {
    this.medCondForm = this.fb.group({
      code: [''],
      designation: [''],
      description: [''],
      commonSymptoms: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.medCondForm.valid) {
      // Convert form data into an OperationType object
      const operationData: MedicalConditionDTO = {
        code: this.medCondForm.value.code,
        designation: this.medCondForm.value.designation,
        description: this.medCondForm.value.description,
        commonSymptoms: this.medCondForm.value.commonSymptoms
      };
      this.dialogRef.close(operationData); // Send OperationType object back to main component
    }
  }
}
