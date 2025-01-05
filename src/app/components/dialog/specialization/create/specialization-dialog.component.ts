import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { SpecializationsService } from '../../../../services/specialization/specialization.service';
import { CreateSpecializationDto } from '../../../../models/staff/staff';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-specialization-dialog',
  templateUrl: './specialization-dialog.component.html',
  styleUrls: ['./specialization-dialog.component.css'],
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
    MatIconModule,
  ],
  standalone: true})

export class SpecializationDialogComponent {
  specializationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private specializationService: SpecializationsService,
    private dialogRef: MatDialogRef<SpecializationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateSpecializationDto
  ) {
    this.specializationForm = this.fb.group({
      designation: [data?.specializationDesignation || '', [Validators.required]],
      code: [data?.specializationCode || '', [Validators.required]],
      description: [data?.specializationDescription || '', [Validators.maxLength(500)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.specializationForm.valid) {
      const formValues = this.specializationForm.value;

      const specializationData: CreateSpecializationDto = {
        specializationDesignation: formValues.designation,
        specializationCode: formValues.code,
        specializationDescription: formValues.description
      };

      this.dialogRef.close(specializationData);
    }
  }
}
