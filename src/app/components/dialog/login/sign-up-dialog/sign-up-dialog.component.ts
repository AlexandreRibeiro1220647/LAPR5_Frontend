import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import {CreatePatientDTO} from '../../../../models/patients/createPatientDTO';

@Component({
  selector: 'app-sign-up.component',
  templateUrl: './sign-up-dialog.component.html',
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
export class SignUpDialogComponent {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SignUpDialogComponent>
  ) {
    this.patientForm = this.fb.group({
      fullName: [''],
      dateOfBirth: [''],
      gender: [''],
      contactInformation: [''],
      email: [''],
      medicalConditions: [''],
      emergencyContact: [''],
      appointmentHistory: ['']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      // Convert form data into an OperationType object
      const operationData: CreatePatientDTO = {
        fullName: this.patientForm.value.fullName,
        dateOfBirth: this.patientForm.value.dateOfBirth,
        gender: this.patientForm.value.gender,
        contactInformation: this.patientForm.value.contactInformation,
        email: this.patientForm.value.email,
        medicalConditions: this.patientForm.value.medicalConditions.split(',').map((s: string) => s.trim()),
        emergencyContact: this.patientForm.value.emergencyContact,
        appointmentHistory: this.patientForm.value.appointmentHistory.split(',').map((s: string) => s.trim()),
      };
      this.dialogRef.close(operationData); // Send OperationType object back to main component
    }
  }
}
