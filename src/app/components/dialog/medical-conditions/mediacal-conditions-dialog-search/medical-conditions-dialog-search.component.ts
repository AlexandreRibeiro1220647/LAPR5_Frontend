import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {SearchOperationRequestDTO} from '../../../../models/operation-requests/searchOperationRequestsDTO';
import { MatSelectModule } from '@angular/material/select';
import { SearchAllergyDTO } from '../../../../models/allergy/searchAllergyDTO';

@Component({
  selector: 'app-medical-conditions-dialog-search.component',
  templateUrl: './medical-conditions-dialog-search.component.html',
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
export class MedicalConditionsSearchDialogComponent {
  medicalConditionsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MedicalConditionsSearchDialogComponent>
  ) {
    this.medicalConditionsForm = this.fb.group({
      code: [''],
      designation: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.medicalConditionsForm.valid) {
      // Convert form data into an OperationType object
      const medicalConditionData: SearchAllergyDTO = {
        code: this.medicalConditionsForm.value.code,
        designation: this.medicalConditionsForm.value.designation,

      };
      this.dialogRef.close(medicalConditionData); // Send OperationType object back to main component
    }
  }
}
