import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import { PatientService } from '../../services/patient/patient.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, MatSortHeader, Sort} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatInput} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog';
import {CreatePatientDTO} from '../../models/patient/createPatientDTO';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {UpdatePatientDTO} from '../../models/patient/updatePatientDTO';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { PatientDialogComponent } from '../dialog/patient/create/patient-dialog.component';
import { PatientDialogEditComponent } from '../dialog/patient/edit/patient-dialog-edit.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { PatientSearchDialogComponent } from '../dialog/patient/search/patient-search-dialog.component';
import {SearchPatientDTO} from '../../models/patient/searchPatientDTO';
import { Patient } from '../../models/patient/patient';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatFormField,
    MatSort,
    MatNoDataRow,
    MatButton,
    MatPaginator,
    MatInput,
    MatFormFieldModule,
    MatCheckbox,
    MatSortHeader,
    MatSelectModule
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [ 'fullName', 'contactInformation', 'email', 'medicalConditions', 'emergencyContact', 'appointmentHistory'];
  dataSource: MatTableDataSource<Patient>;
  selection = new SelectionModel<Patient>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Patient>([]);
  }

  patients: Patient[] = []; 


  ngOnInit() {
    this.loadPatients(); 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPatients(): void {
    this.patientService.getItems().subscribe(
      (data: Patient[]) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patient', error);
      }
    );
  }

  getPatientName(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.user.name : 'Unknown';
  }

  getPatientContactInformation(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.contactInformation : 'Unknown';
  }

  getPatientEmail(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.user.email.value : 'Unknown';
  }

  getPatientMedicalConditions(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.medicalConditions.toString() : 'Unknown';
  }

  getPatientEmergencyContact(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.emergencyContact : 'Unknown';
  }

  getPatientAppointmentHistory(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.appointmentHistory.toString() : 'Unknown';
  }


  openEditDialog(): void {
    const dialogRef = this.dialog.open(PatientDialogEditComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: UpdatePatientDTO | undefined) => {
      if (result) {
        const selectedRows = this.selection.selected;

        if (selectedRows.length === 0) {
          console.log('No row selected');
          return;
        }
        selectedRows.forEach(row => {
          console.log(row);
          const cleanedData = this.cleanPayload(result, row);  // Clean the data
          console.log(cleanedData);

          this.patientService.updateItem(row.medicalRecordNumber, cleanedData).subscribe({
            next: (response) => {
              console.log('Patient updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating patient:', error);
            }
          });
        });
        console.log('Patient Data:', result);
      }
    });
  }

  // Function to remove properties that are either empty or unchanged
  cleanPayload(data: any, originalData: any): any {
    const cleanedData = { ...data };

    // Loop over all properties in the data
    Object.keys(cleanedData).forEach(key => {
      // If the value is an empty string or if it hasn't changed, remove it
      if (
        (typeof cleanedData[key] === 'string' && cleanedData[key] === "") ||  // Check if it's an empty string
        (Array.isArray(cleanedData[key]) && cleanedData[key].length === 0) ||  // Check if it's an empty array
        (Array.isArray(cleanedData[key]) && cleanedData[key].every(item => item === "")) ||  // Check if array contains only empty strings

        cleanedData === originalData  // If the value hasn't changed, remove it
      ) {
        delete cleanedData[key];
      }
    });

    return cleanedData;
  }

  toggleSelection(row: Patient) {
    this.selection.toggle(row);
  }

  // Backend call with selected row data
  deletePatientRequest() {
    const selectedData = this.selection.selected[0]; // Get the selected row
    if (selectedData) {
      this.patientService.deleteItem(this.selection.selected[0].medicalRecordNumber).subscribe({
        next: (response) => console.log('DELETE request successful', response),
        error: (error) => console.error('Error with DELETE request', error),
      });
    } else {
      alert('Please select a row to perform the action.');
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}