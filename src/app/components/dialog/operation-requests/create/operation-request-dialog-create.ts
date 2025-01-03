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

@Component({
  selector: 'app-operation-requests-dialog-create',
  templateUrl: './operation-request-dialog-create.html',
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
export class OperationRequestDialogCreate {
  operationRequestForm: FormGroup;
  operationTypes: OperationType[] = []; // Lista de tipos de operação
  patients: Patient[] = []; // Lista de tipos de operação
  staffs: Staff[] = []; // Lista de tipos de operação


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OperationRequestDialogCreate>,
    private operationRequestService: OperationRequestService // Serviço para buscar Operation Types
  ) {
    this.operationRequestForm = this.fb.group({
      patientEmail: [''],
      doctorEmail: [''],
      operationTypeName: [''],
      deadline: [''],
      priority: ['']
    });
    this.loadPatients();
    this.loadOperationTypes(); 
    this.loadDoctors();
   }

  onCancel(): void {
    this.dialogRef.close();
  }

  loadOperationTypes(): void {
    this.operationRequestService.getOperationTypes().subscribe(
      (data: OperationType[]) => {
        this.operationTypes = data;
      },
      (error) => {
        console.error('Error fetching operation types', error);
      }
    );
  }

  loadPatients(): void {
    this.operationRequestService.getPatients().subscribe(
      (data: Patient[]) => {
        this.patients = data;
        console.log('Patients loaded:', this.patients);
      },
      (error) => {
        console.error('Error fetching operation types', error);
      }
    );
  }

  
  loadDoctors(): void {
    this.operationRequestService.getStaff().subscribe(
      (data: Staff[]) => {
        this.staffs = data;
        console.log('Staffs loaded:', this.staffs);
      },
      (error) => {
        console.error('Error fetching operation types', error);
      }
    );
  }


  onSubmit(): void {
    if (this.operationRequestForm.valid) {
    // Buscar o ID do Operation Type pelo nome digitado
    const patientEmail = this.operationRequestForm.value.patientEmail.trim();
    const doctorEmail = this.operationRequestForm.value.doctorEmail.trim();
    const operationTypeName = this.operationRequestForm.value.operationTypeName.trim();
    const selectedType = this.operationTypes.find(
      type => type.name.toLowerCase() === operationTypeName.toLowerCase()
    );
    const patientSelected = this.patients.find(
      p => p.user.email.value.toLowerCase() === patientEmail.toLowerCase()
    );
    console.log('Patient selected:', patientSelected);

    if (!patientSelected) {
      console.error(`Operation Type "${patientEmail}" not found in`, this.patients);
      alert(`Patient with email "${patientEmail}" not found.`);
      return;
    }

    
    const staffSelected = this.staffs.find(
      p => p.user.email.value.toLowerCase() === doctorEmail.toLowerCase()
    );
    console.log('Doctor selected:', staffSelected);
    
    console.log('Selected Doctor ID:', staffSelected?.licenseNumber);

    if (!staffSelected) {
      console.error(`Oc "${doctorEmail}" not found in`, this.staffs);
      alert(`Patient with email "${doctorEmail}" not found.`);
      return;
    }


    if (!selectedType) {
      // Caso o nome digitado seja inválido
      console.error(`Operation Type "${operationTypeName}" not found in`, this.operationTypes);
      alert(`Operation Type "${operationTypeName}" not found. Please try again.`);
      return;
    }
      
    console.log('Selected Operation Type:', selectedType);

      // Convert form data into an OperationRequest object
      const operationRequestData: CreateOperationRequestDTO = {
        pacientid: patientSelected.medicalRecordNumber,
        doctorid: staffSelected.licenseNumber,
        operationTypeId: selectedType.operationTypeId, // Inserir o ID correspondente
        deadline: this.operationRequestForm.value.deadline,
        priority: this.operationRequestForm.value.priority
      };

      console.log('Operation Request Data:', operationRequestData);
      this.dialogRef.close(operationRequestData); // Send OperationRequest object back to main component
    }
  }
}
