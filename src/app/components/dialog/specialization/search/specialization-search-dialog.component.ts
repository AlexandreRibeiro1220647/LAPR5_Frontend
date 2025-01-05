import { Component, Inject } from '@angular/core';
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
import { SearchSpecializationDto } from '../../../../models/staff/staff';

@Component({
  selector: 'app-specialization-search-dialog',
  templateUrl: './specialization-search-dialog.component.html',
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
  standalone: true
})
export class SpecializationSearchDialogComponent {
  specializationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SpecializationSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.specializationForm = this.fb.group({
      specializationDesignation: [''],
      specializationCode: [''],
      specializationDescription: [''],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.specializationForm.invalid) {
      return;
    }

    const formValues = this.specializationForm.value;

    const searchSpecializationDto: SearchSpecializationDto = {
      specializationDesignation: formValues.specializationDesignation || undefined, // Campo opcional
      specializationCode: formValues.specializationCode || undefined, // Campo opcional
      specializationDescription: formValues.specializationDescription || undefined, // Campo opcional
    };

    this.dialogRef.close(searchSpecializationDto); // Fecha o diálogo e retorna o DTO criado
  }
}
