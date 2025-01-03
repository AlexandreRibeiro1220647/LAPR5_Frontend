import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CreateStaffDTO } from '../../../../models/staff/createStaffDTO';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Slot} from '../../../../models/staff/slot';
import {StaffStatus} from '../../../../models/staff/staffstatus';
@Component({
  selector: 'app-staff-dialog',
  templateUrl: './staff-dialog.component.html',
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
export class StaffDialogComponent {
  staffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateStaffDTO
  ) {
    this.staffForm = this.fb.group({
      fullName: [data?.user.name || '', Validators.required],
      email: [data?.user.email.value || '', [Validators.required, Validators.email]],
      phone: [data?.phone || '', Validators.required],
      specialization: [data?.specialization || '', Validators.required],
      status: [data?.status || StaffStatus.ACTIVE, Validators.required],
      availabilitySlots: this.fb.array(this.initAvailabilitySlots(data?.availabilitySlots || [])),
    });
  }

  // Initialize availability slots
  private initAvailabilitySlots(slots: Slot[]): FormGroup[] {
    return slots.map((slot) =>
      this.fb.group({
        startTime: [slot.startTime || '', Validators.required],
        endTime: [slot.endTime || '', Validators.required],
      })
    );
  }

  // Getter for availabilitySlots array
  get availabilitySlots(): FormArray {
    return this.staffForm.get('availabilitySlots') as FormArray;
  }

  // Add a new availability slot
  addSlot(): void {
    this.availabilitySlots.push(
      this.fb.group({
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
      })
    );
  }

  // Remove a slot by index
  removeSlot(index: number): void {
    this.availabilitySlots.removeAt(index);
  }

  // Cancel the dialog
  onCancel(): void {
    this.dialogRef.close();
  }

  // Submit the form
  onSubmit(): void {
    if (this.staffForm.invalid) {
      return;
    }

    const formValues = this.staffForm.value;

    const createStaffDto: CreateStaffDTO = {
      specialization: formValues.specialization,
      phone: formValues.phone,
      availabilitySlots: formValues.availabilitySlots || [],
      status: formValues.status || StaffStatus.ACTIVE,
      user: {
        id: formValues.userId || '', // Se necessário, adicionar um controle para ID
        name: formValues.fullName, // Usa o campo fullName como o nome do usuário
        email: {
          value: formValues.email, // Estrutura para o e-mail
        },
        role: formValues.role || 'Staff', // Campo de role com valor padrão
      },
    };

    this.dialogRef.close(createStaffDto); // Fecha o diálogo e retorna o DTO criado
  }
}
