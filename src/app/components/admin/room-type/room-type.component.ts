import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import { OperationTypesService } from '../../../services/operation-types/operation-types.service';
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
import {CreateOperationTypeDTO} from '../../../models/operation-types/createOperationTypeDTO';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';

import {LiveAnnouncer} from '@angular/cdk/a11y';
import { RoomType } from '../../../models/room-types/roomType';
import { RoomTypesService } from '../../../services/room-types/room-types.service';
import { RoomTypesDialogComponent } from '../../dialog/room-type/room-type-dialog.component';
import { CreateRoomTypeDTO } from '../../../models/room-types/createRoomTypeDTO';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './room-type.component.html',
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
  styleUrls: ['./room-type.component.css']
})

export class RoomTypeComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['designation', 'roomDescription'];
  dataSource: MatTableDataSource<RoomType>;
  selection = new SelectionModel<RoomType>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private roomTypesService: RoomTypesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<RoomType>([]);
  }

  ngOnInit() {
    this.loadRoomTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadRoomTypes() {
    this.roomTypesService.getItems().subscribe(
      (data: RoomType[]) => {
        console.log('Room Types Loaded:', data); // Verifique se os dados têm roomDesignation
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching room types', error);
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(RoomTypesDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: CreateRoomTypeDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        console.log(result);
        this.roomTypesService.createItem(result).subscribe({
          next: (response) => {
            console.log('RoomType created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating roomType:', error);
          }
        });
        console.log('Room Type Data:', result);
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
  toggleSelection(row: RoomType) {
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
