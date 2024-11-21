import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {SearchStaffDTO} from '../../../../models/staff/searchStaffDTO';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-staff-dialog',
  templateUrl: './staff-search-dialog.component.html',
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatSelectModule,
  ],
  standalone: true})
export class StaffSearchDialogComponent {
  staffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StaffSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.staffForm = this.fb.group({
      fullName: [''],
      email: [''],
      phone: [''],
      specialization: [''],
      status: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.staffForm.valid) {
      const staffData: SearchStaffDTO = {
        fullName: this.staffForm.value.fullName?.trim(),
        email: this.staffForm.value.email?.trim(),
        phone: this.staffForm.value.phone?.trim(),
        specialization: this.staffForm.value.specialization?.trim(),
        status: this.staffForm.value.status,
      };

      this.dialogRef.close(staffData);
    }
  }
}
