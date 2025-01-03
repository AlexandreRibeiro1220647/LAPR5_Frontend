import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'; 
import {CreateOperationRequestDTO} from '../../../../models/operation-requests/createOperationRequestDTO';
import { CommonModule } from '@angular/common';
import { OperationType } from '../../../../models/operation-types/operationType';
import { OperationRequestService } from '../../../../services/operation-requests/operation-requests.service';
import { Patient } from '../../../../models/patient/patient';
import { Staff } from '../../../../models/staff/staff';
import { OperationRequest } from '../../../../models/operation-requests/operationRequest';
import { AppointmentSurgeryService } from '../../../../services/appointment-surgery/appointment-surgery.service';
import { SurgeryRoom } from '../../../../models/surgery-room/surgeryRoom';

@Component({
  selector: 'app-appointment-surgery-dialog-create',
  templateUrl: './appointment-surgery-dialog-create.component.html',
  imports: [
    CommonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatSelectModule
  ],
  standalone: true
})
export class AppointmentSurgeryDialogCreate {
  appointmentSurgeryForm: FormGroup;
  operationRequests: OperationRequest[] = []; // Lista de tipos de operação
  surgeryRooms: SurgeryRoom[] = []
 

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentSurgeryDialogCreate>,
    private appointmentSurgeryService: AppointmentSurgeryService // Serviço para buscar Operation Types
  ) {
    this.appointmentSurgeryForm = this.fb.group({
      roomName: [''],
      appointmentSurgeryName: [''],
      operationRequestId: [''],
      appointmentSurgeryDate: [''],
      appointmentSurgeryStatus: [''],
      startTime: [''],
      endTime: ['']
    });
    this.loadOperationRequests();
    this.loadSurgeryRooms(); 
   }

  onCancel(): void {
    this.dialogRef.close();
  }

  loadOperationRequests(): void {
    this.appointmentSurgeryService.getOperationRequests().subscribe(
      (data: OperationRequest[]) => {
        this.operationRequests = data;
      },
      (error) => {
        console.error('Error fetching operation requests', error);
      }
    );
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

  

  onSubmit(): void {
    if (this.appointmentSurgeryForm.valid) {
    // Buscar o ID do Operation Type pelo nome digitado
    const roomName = this.appointmentSurgeryForm.value.roomName.trim();
   
    const surgeryRoomSelected = this.surgeryRooms.find(
      p => p.roomName.toLowerCase() === roomName.toLowerCase()
    );
    console.log('SurgeryRoom selected:', surgeryRoomSelected);

    if (!surgeryRoomSelected) {
      console.error(`Surgery Room: "${roomName}" not found in`, this.surgeryRooms);
      alert(`Surgery Room with the name  "${roomName}" not found.`);
      return;
    }
    const appointmentSurgeryData = {
      roomId: surgeryRoomSelected.roomNumber,
      appointmentSurgeryName: this.appointmentSurgeryForm.value.appointmentSurgeryName,
      operationRequestId: this.appointmentSurgeryForm.value.operationRequestId,
      appointmentSurgeryDate: this.appointmentSurgeryForm.value.appointmentSurgeryDate,
      appointmentSurgeryStatus: this.appointmentSurgeryForm.value.appointmentSurgeryStatus,
      startTime: this.appointmentSurgeryForm.value.startTime,
      endTime: this.appointmentSurgeryForm.value.endTime
    };

    console.log('Appointment Surgery Data:', appointmentSurgeryData);
    this.dialogRef.close(appointmentSurgeryData);
  } else {
    console.error('Form is invalid:', this.appointmentSurgeryForm);
  }
}
}
