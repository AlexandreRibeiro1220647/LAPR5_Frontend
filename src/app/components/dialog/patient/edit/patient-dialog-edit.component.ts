import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {UpdatePatientDTO} from '../../../../models/patient/updatePatientDTO';

@Component({
  selector: 'app-patient-dialog-edit',
  templateUrl: './patient-dialog-edit.component.html',
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
export class PatientDialogEditComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientDialogEditComponent>
  ) {
    this.patientForm = this.fb.group({
      fullName: [''],
      contactInformation: [''],
      email: [''],
      medicalConditions: [''],
      emergencyContact: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      const patientData: UpdatePatientDTO = {
        fullName: this.patientForm.value.fullName,
        contactInformation: this.patientForm.value.contactInformation,
        email: this.patientForm.value.email,
        medicalConditions: this.patientForm.value.medicalConditions.split(',').map((s: string) => s.trim()),
        emergencyContact: this.patientForm.value.emergencyContact,
      };
      this.dialogRef.close(patientData);
    }
  }
}
