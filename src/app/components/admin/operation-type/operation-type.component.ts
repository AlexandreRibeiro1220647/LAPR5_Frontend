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
import {OperationTypesDialogComponent} from '../../dialog/operation-types/operation-types-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateOperationTypeDTO} from '../../../models/operation-types/createOperationTypeDTO';
import {OperationType} from '../../../models/operation-types/operationType';
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {OperationTypesDialogEditComponent} from '../../dialog/operation-types/edit/operation-types-dialog-edit.component';
import {UpdateOperationTypeDTO} from '../../../models/operation-types/updateOperationTypeDTO';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {
  OperationTypesSearchDialogComponent
} from '../../dialog/operation-types/search/operation-types-search-dialog.component';
import {SearchOperationTypeDTO} from '../../../models/operation-types/searchOperationTypeDTO';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './operation-type.component.html',
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
  styleUrls: ['./operation-type.component.css']
})
export class OperationTypeComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['id', 'name', 'requiredStaffBySpecialization', 'estimatedDuration', 'isActive'];
  dataSource: MatTableDataSource<OperationType>;
  selection = new SelectionModel<OperationType>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private operationTypesService: OperationTypesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<OperationType>([]);
  }

  ngOnInit() {
    this.loadOperationTypes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadOperationTypes() {
    this.operationTypesService.getItems().subscribe(
      (data: OperationType[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching operation types', error);
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(OperationTypesDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: CreateOperationTypeDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.operationTypesService.createItem(result).subscribe({
          next: (response) => {
            console.log('Operation created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating operation:', error);
          }
        });
        console.log('Operation Type Data:', result);
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(OperationTypesDialogEditComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: UpdateOperationTypeDTO | undefined) => {
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

          this.operationTypesService.updateItem(row.operationTypeId, cleanedData).subscribe({
            next: (response) => {
              console.log('Operation created successfully:', response);
            },
            error: (error) => {
              console.error('Error creating operation:', error);
            }
          });
        });
        console.log('Operation Type Data:', result);
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
  inactivateOperationRequest() {
    const selectedData = this.selection.selected[0]; // Get the selected row
    if (selectedData) {
      this.operationTypesService.deleteItem(this.selection.selected[0].operationTypeId).subscribe({
        next: (response) => console.log('PUT request successful', response),
        error: (error) => console.error('Error with PUT request', error),
      });
    } else {
      alert('Please select a row to perform the action.');
    }
  }

  // Toggle selection for a single row when clicked
  toggleSelection(row: OperationType) {
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
    const dialogRef = this.dialog.open(OperationTypesSearchDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: SearchOperationTypeDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.operationTypesService.searchItems(result).subscribe({
          next: (response) => {
            this.dataSource.data = response;
          },
          error: (error) => {
            console.error('Error filtering operation type data:', error);
          }
        });
        console.log('Operation Type Data:', result);
      }
    });
  }
}
