import {Component, OnInit, ViewChild } from '@angular/core';
import { OperationTypesService } from '../../services/operation-types/operation-types.service';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatSort} from '@angular/material/sort';
import {MatButton} from '@angular/material/button';
import {MatPaginator} from '@angular/material/paginator';
import {MatInput} from '@angular/material/input';
import {OperationTypesDialogComponent} from '../dialog/operation-types/operation-types-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateOperationTypeDTO} from '../../models/operation-types/createOperationTypeDTO';
import {OperationType} from '../../models/operation-types/operationType';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
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
    MatFormFieldModule
  ],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['name', 'requiredStaffBySpecialization', 'estimatedDuration', 'isActive'];
  dataSource: MatTableDataSource<OperationType>;

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


  openDialog(): void {
    const dialogRef = this.dialog.open(OperationTypesDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: CreateOperationTypeDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.operationTypesService.createItem(result).subscribe({
          next: (response) => {
            console.log('Operation created successfully:', response);
            // Handle successful response, e.g., add to table, clear form, etc.
          },
          error: (error) => {
            console.error('Error creating operation:', error);
            // Handle error, show message to user, etc.
          }
        });
        console.log('Operation Type Data:', result);
        // Here you can push result to your data source to update the table
      }
    });
  }
}
