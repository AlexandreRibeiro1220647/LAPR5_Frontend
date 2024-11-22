import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {UpdatePatientDTO} from '../../../../models/patient/updatePatientDTO';
import {SearchPatientDTO} from '../../../../models/patient/searchPatientDTO';

@Component({
  selector: 'app-patient-search-dialog',
  templateUrl: './patient-search-dialog.component.html',
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
export class PatientSearchDialogComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientSearchDialogComponent>
  ) {
    this.patientForm = this.fb.group({
      contactInformation: [''],
      gender: [''],
      dateOfBirth: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData: SearchPatientDTO = {
        contactInformation: this.patientForm.value.contactInformation,
        gender: this.patientForm.value.gender,
        dateOfBirth: this.patientForm.value.dateOfBirth,
      };
      this.dialogRef.close(patientData);
    }
  }
}
