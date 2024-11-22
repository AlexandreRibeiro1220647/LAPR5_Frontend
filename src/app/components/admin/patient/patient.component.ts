import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import { PatientService } from '../../../services/patient/patient.service';
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
import {PatientDialogComponent} from '../../dialog/patient/create/patient-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreatePatientDTO} from '../../../models/patient/createPatientDTO';
import {Patient} from '../../../models/patient/patient';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {PatientDialogEditComponent} from '../../dialog/patient/edit/patient-dialog-edit.component';
import {UpdatePatientDTO} from '../../../models/patient/updatePatientDTO';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {
  PatientSearchDialogComponent
} from '../../dialog/patient/search/patient-search-dialog.component';
import {SearchPatientDTO} from '../../../models/patient/searchPatientDTO';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './patient.component.html',
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
    MatSortHeader
  ],
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['contactInformation', 'gender', 'dateOfBirht'];
  dataSource: MatTableDataSource<Patient>;
  selection = new SelectionModel<Patient>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Patient>([]);
  }

  ngOnInit() {
    this.loadPatient();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPatient() {
    this.patientService.getItems().subscribe(
      (data: Patient[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching patient', error);
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: CreatePatientDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.patientService.createItem(result).subscribe({
          next: (response) => {
            console.log('Patient created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating patient:', error);
          }
        });
        console.log('Patient Data:', result);
      }
    });
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
              console.log('Patient created successfully:', response);
            },
            error: (error) => {
              console.error('Error creating patient:', error);
            }
          });
        });
        console.log('Patient Type Data:', result);
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

  // Toggle selection for a single row when clicked
  toggleSelection(row: Patient) {
    this.selection.toggle(row);
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

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(PatientSearchDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: SearchPatientDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.patientService.searchItems(result).subscribe({
          next: (response) => {
            this.dataSource.data = response;
          },
          error: (error) => {
            console.error('Error filtering patient data:', error);
          }
        });
        console.log('Patient Data:', result);
      }
    });
  }
}
