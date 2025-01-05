import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup,FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { SpecializationsService } from '../../../../services/specialization/specialization.service';
import { SpecializationDto } from '../../../../models/staff/staff';

@Component({
  selector: 'app-specialization-dialog-edit',
  templateUrl: './specialization-dialog-edit.component.html',
  styleUrls: ['./specialization-dialog-edit.component.css'],
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

export class SpecializationDialogEditComponent implements OnInit {
  specializationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private specializationService: SpecializationsService,
    private dialogRef: MatDialogRef<SpecializationDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SpecializationDto
  ) {
    this.specializationForm = this.fb.group({
      designation: ['', [Validators.required]],
      description: ['', [Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.specializationForm.patchValue({
        designation: this.data.specializationDesignation,
        description: this.data.specializationDescription
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.specializationForm.valid) {
      const formValues = this.specializationForm.value;

      const updatedSpecialization: SpecializationDto = {
        ...this.data,
        specializationDesignation: formValues.designation,
        specializationDescription: formValues.description
      };

      this.dialogRef.close(updatedSpecialization);
    }
  }
}
