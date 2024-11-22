import { Component, Inject } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { UpdateStaffDto} from '../../../../models/staff/updateStaffDTO';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Slot} from '../../../../models/staff/slot';
import {StaffStatus} from '../../../../models/staff/staffstatus';

@Component({
  selector: 'app-staff-dialog-edit',
  templateUrl: './staff-dialog-edit.component.html',
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
export class StaffDialogEditComponent {
  staffForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StaffDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateStaffDto
  ) {
    this.staffForm = this.fb.group({
      fullName: [data?.user.name || '', Validators.required],
      email: [data?.user.email || '', [Validators.required, Validators.email]],
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
        startTime: [slot.startTime, Validators.required],
        endTime: [slot.endTime, Validators.required],
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
    if (this.staffForm.valid) {
      const formValues = this.staffForm.value;

      const updatedData: UpdateStaffDto = {
        phone: formValues.phone,
        specialization: formValues.specialization,
        availabilitySlots: formValues.availabilitySlots,
        status: formValues.status,
        user: {
          id: this.data.user.id, // Preserva o ID original
          name: formValues.fullName, // Atualiza o nome
          email: {
            value: formValues.email, // Atualiza o email
          },
          role: this.data.user.role, // Preserva o role original
        },
      };

      this.dialogRef.close(updatedData);
    }
  }

}
