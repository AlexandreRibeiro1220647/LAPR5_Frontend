import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import { OperationRequestService } from '../../services/operation-requests/operation-requests.service';
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
import {OperationTypesDialogComponent} from '../dialog/operation-types/create/operation-types-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateOperationRequestDTO} from '../../models/operation-requests/createOperationRequestDTO';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {UpdateOperationRequestDTO} from '../../models/operation-requests/updateOperationRequestDTO';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { OperationRequest } from '../../models/operation-requests/operationRequest';
import { OperationRequestDialogCreate } from '../dialog/operation-requests/create/operation-request-dialog-create';
import { OperationRequestDialogEdit } from '../dialog/operation-requests/edit/operation-request-dialog-edit';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  OperationRequestSearchDialogComponent
} from '../dialog/operation-requests/search/operation-request-dialog-search';
import {SearchOperationRequestDTO} from '../../models/operation-requests/searchOperationRequestsDTO';
import { OperationTypesService } from '../../services/operation-types/operation-types.service';
import { OperationType } from '../../models/operation-types/operationType';
import { Patient } from '../../models/patient/patient';
import { Staff } from '../../models/staff/staff';




@Component({
  selector: 'app-staff',
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
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [ 'pacientId', 'doctorId', 'operationTypeId', 'priority', 'deadline'];
  dataSource: MatTableDataSource<OperationRequest>;
  selection = new SelectionModel<OperationRequest>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private operationRequestService: OperationRequestService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<OperationRequest>([]);
  }

  operationTypes: OperationType[] = [];
  patients: Patient[] = []; 
  staffs: Staff[] = []; 


  ngOnInit() {
    this.loadOperationRequests();
    this.loadOperationTypes();
    this.loadPatients(); 
    this.loadStaffs();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadOperationRequests() {
    this.operationRequestService.getItems().subscribe(
      (data: OperationRequest[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching operation requests', error);
      }
    );
  }

  loadOperationTypes() {
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
      },
      (error) => {
        console.error('Error fetching patients', error);
      }
    );
  }

  loadStaffs(): void {
    this.operationRequestService.getStaff().subscribe(
      (data: Staff[]) => {
        this.staffs = data;
      },
      (error) => {
        console.error('Error fetching patients', error);
      }
    );
  }


  getOperationTypeName(operationTypeId: string): string {
    const operationType = this.operationTypes.find(type => type.operationTypeId === operationTypeId);
    return operationType ? operationType.name : 'Unknown';
  }

  getPatientName(patientId: string): string {
    const patient = this.patients.find(p => p.medicalRecordNumber === patientId);
    return patient ? patient.user.name : 'Unknown';
  }

  getStaffName(doctorId: string): string {
    const doctor = this.staffs.find(p => p.licenseNumber === doctorId);
    return doctor ? doctor.user.name : 'Unknown';
  }


  openCreateDialog(): void {
    const dialogRef = this.dialog.open(OperationRequestDialogCreate, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: CreateOperationRequestDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.operationRequestService.createItem(result).subscribe({
          next: (response) => {
            console.log('Operation request created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating operation request:', error);
          }
        });
        console.log('Operation Request Data:', result);
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(OperationRequestDialogEdit, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: UpdateOperationRequestDTO | undefined) => {
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

          this.operationRequestService.updateItem(row.operationId, cleanedData).subscribe({
            next: (response) => {
              console.log('Operation request updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating operation request:', error);
            }
          });
        });
        console.log('Operation Request Data:', result);
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
  deleteOperationRequest() {
    const selectedData = this.selection.selected[0]; // Get the selected row
    if (selectedData) {
      this.operationRequestService.deleteItem(this.selection.selected[0].operationId).subscribe({
        next: (response) => console.log('PUT request successful', response),
        error: (error) => console.error('Error with PUT request', error),
      });
    } else {
      alert('Please select a row to perform the action.');
    }
  }

  // Toggle selection for a single row when clicked
  toggleSelection(row: OperationRequest) {
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
    const dialogRef = this.dialog.open(OperationRequestSearchDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: SearchOperationRequestDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.operationRequestService.searchItems(result).subscribe({
          next: (response) => {
            this.dataSource.data = response;
          },
          error: (error) => {
            console.error('Error filtering operation request data:', error);
          }
        });
        console.log('Operation Request Data:', result);
      }
    });
  }

}