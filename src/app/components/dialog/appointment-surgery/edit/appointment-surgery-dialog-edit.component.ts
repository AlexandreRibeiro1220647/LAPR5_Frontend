import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { UpdateOperationRequestDTO } from '../../../../models/operation-requests/updateOperationRequestDTO';
import { SurgeryRoom } from '../../../../models/surgery-room/surgeryRoom';
import { AppointmentSurgeryService } from '../../../../services/appointment-surgery/appointment-surgery.service';

@Component({
  selector: 'app-appointment-surgery-dialog-edit',
  templateUrl: './appointment-surgery-dialog-edit.component.html',
  imports: [
    MatDialogActions,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatFormFieldModule,
    MatSelectModule
  ],
  standalone: true
})
export class AppointmentSurgeryDialogEdit {
  appointmentSurgeryForm: FormGroup;
  StatusOptions = ['Scheduled', 'Completed', 'Canceled']; // Opções de prioridade para o dropdown
  surgeryRooms: SurgeryRoom[] = []
  

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentSurgeryDialogEdit>,
    private appointmentSurgeryService: AppointmentSurgeryService // Serviço para buscar Operation Types
    
  ) {
    this.appointmentSurgeryForm = this.fb.group({
      roomName: [''],
      appointmentSurgeryName: [''],
      appointmentSurgeryStatus: [''],
      appointmentSurgeryDate: [''],
    });
    this.loadSurgeryRooms(); 

  }

  loadSurgeryRooms(): void {
    this.appointmentSurgeryService.getSurgeryRooms().subscribe(
      (data: SurgeryRoom[]) => {
        this.surgeryRooms = data;
        console.log('Surgery Rooms loaded:', this.surgeryRooms);
      },
      (error) => {
        console.error('Error fetching surgery Rooms', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.appointmentSurgeryForm.valid) {

      const roomName = this.appointmentSurgeryForm.value.roomName.trim();
   if(roomName){
    const surgeryRoomSelected = this.surgeryRooms.find(
      p => p.roomName.toLowerCase() === roomName.toLowerCase()
    );
    console.log('SurgeryRoom selected:', surgeryRoomSelected);

    if (!surgeryRoomSelected) {
      console.error(`Surgery Room: "${roomName}" not found in`, this.surgeryRooms);
      alert(`Surgery Room with the name  "${roomName}" not found.`);
      return;
    }
  }
      // Convert form data into an OperationRequest object
      const updatedData = {
        roomName: this.appointmentSurgeryForm.value.roomName,
        appointmentSurgeryName: this.appointmentSurgeryForm.value.appointmentSurgeryName,
        appointmentSurgeryStatus: this.appointmentSurgeryForm.value.appointmentSurgeryStatus,
        appointmentSurgeryDate: this.appointmentSurgeryForm.value.appointmentSurgeryDate,
      };
      this.dialogRef.close(updatedData); // Send OperationRequest object back to main component
    }
  }
}
