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
  selector: 'app-allergies-dialog-search.component',
  templateUrl: './allergies-dialog-search.component.html',
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
export class AllergiesSearchDialogComponent {
  allergiesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AllergiesSearchDialogComponent>
  ) {
    this.allergiesForm = this.fb.group({
      code: [''],
      designation: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.allergiesForm.valid) {
      // Convert form data into an OperationType object
      const allergiesData: SearchAllergyDTO = {
        code: this.allergiesForm.value.code,
        designation: this.allergiesForm.value.designation,

      };
      this.dialogRef.close(allergiesData); // Send OperationType object back to main component
    }
  }
}
