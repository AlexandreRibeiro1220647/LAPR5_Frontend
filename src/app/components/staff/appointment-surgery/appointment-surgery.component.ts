import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import { OperationRequestService } from '../../../services/operation-requests/operation-requests.service';
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
import {OperationTypesDialogComponent} from '../../dialog/operation-types/create/operation-types-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateOperationRequestDTO} from '../../../models/operation-requests/createOperationRequestDTO';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {UpdateOperationRequestDTO} from '../../../models/operation-requests/updateOperationRequestDTO';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { OperationRequest } from '../../../models/operation-requests/operationRequest';
import { OperationRequestDialogCreate } from '../../dialog/operation-requests/create/operation-request-dialog-create';
import { OperationRequestDialogEdit } from '../../dialog/operation-requests/edit/operation-request-dialog-edit';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {
  OperationRequestSearchDialogComponent
} from '../../dialog/operation-requests/search/operation-request-dialog-search';
import {SearchOperationRequestDTO} from '../../../models/operation-requests/searchOperationRequestsDTO';
import { OperationTypesService } from '../../../services/operation-types/operation-types.service';
import { OperationType } from '../../../models/operation-types/operationType';
import { Patient } from '../../../models/patient/patient';
import { Staff } from '../../../models/staff/staff';
import { AppointmentSurgery } from '../../../models/appointments-surgery/appointmentSurgery';
import { AppointmentSurgeryService } from '../../../services/appointment-surgery/appointment-surgery.service';
import { RoomType } from '../../../models/room-types/roomType';
import { SurgeryRoom } from '../../../models/surgery-room/surgeryRoom';
import { CreateAppointmentSurgeryDTO } from '../../../models/appointments-surgery/createAppointmentSurgeryDTO';
import { AppointmentSurgeryDialogEdit } from '../../dialog/appointment-surgery/edit/appointment-surgery-dialog-edit.component';
import { UpdateAppointmentSurgeryDTO } from '../../../models/appointments-surgery/updateAppointmentSurgeryDTO';
import { AppointmentSurgeryDialogCreate } from '../../dialog/appointment-surgery/create/appointment-surgery-dialog-create.component';




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
  templateUrl: './appointment-surgery.component.html',
  styleUrls: ['./appointment-surgery.component.css']
})
export class AppointmentSurgeryComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = [ 'appointmentSurgeryName', 'roomId', 'operationRequestId', 'appointmentSurgeryDate', 'appointmentSurgeryStatus', 'startTime', 'endTime' ];
  dataSource: MatTableDataSource<AppointmentSurgery>;
  selection = new SelectionModel<AppointmentSurgery>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appointmentSurgeryService: AppointmentSurgeryService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<AppointmentSurgery>([]);
  }

  surgeryRooms: SurgeryRoom[] = [];



  ngOnInit() {
    this.loadAppointmentSurgeries();
    this.loadSurgeryRooms();
 
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadAppointmentSurgeries() {
    this.appointmentSurgeryService.getItems().subscribe(
      (data: AppointmentSurgery[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching appointments surgeries', error);
      }
    );
  }

  loadSurgeryRooms() {
    this.appointmentSurgeryService.getSurgeryRooms().subscribe(
      (data: SurgeryRoom[]) => {
        this.surgeryRooms = data;
      },
      (error) => {
        console.error('Error fetching surgeryRooms', error);
      }
    );
  }



  getRoomName(roomId: string): string {
    const surgeryRoom = this.surgeryRooms.find(type => type.roomNumber === roomId);
    return surgeryRoom ? surgeryRoom.roomName : 'Unknown';
  }



  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AppointmentSurgeryDialogCreate, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: CreateAppointmentSurgeryDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.appointmentSurgeryService.createItem(result).subscribe({
          next: (response) => {
            console.log('AppointmentSurgery created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating appointmentSurgery:', error);
          }
        });
        console.log('AppointmentSurgery Data:', result);
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AppointmentSurgeryDialogEdit, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: UpdateAppointmentSurgeryDTO | undefined) => {
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

          this.appointmentSurgeryService.updateItem(row.appointmentSurgeryId, cleanedData).subscribe({
            next: (response) => {
              console.log('AppointmentSurgery updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating appointment Surgery:', error);
            }
          });
        });
        console.log('AppointmentSurgery Data:', result);
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

  // Toggle selection for a single row when clicked
  toggleSelection(row: AppointmentSurgery) {
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
}