import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
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
import {MatCheckbox} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';

import {AllergiesService} from '../../../services/allergies/allergies.service';
import {AllergyDTO} from '../../../models/allergy/allergyDTO';
import {AllergiesDialogComponent} from '../../dialog/allergies/allergies-dialog.component';
import * as Console from 'console';

@Component({
  selector: 'app-allergies',
  standalone: true,
  templateUrl: './allergies.component.html',
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
  styleUrls: ['./allergies.component.css']
})
export class AllergiesComponent implements OnInit, AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  displayedColumns: string[] = ['code', 'designation', 'description'];
  dataSource: MatTableDataSource<AllergyDTO>;
  selection = new SelectionModel<AllergyDTO>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private allergiesService: AllergiesService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<AllergyDTO>([]);
  }

  ngOnInit() {
    this.loadAllergies();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAllergies() {
    this.allergiesService.getItems().subscribe(
      (data: AllergyDTO[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching allergies', error);
      }
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(AllergiesDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: AllergyDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.allergiesService.createItem(result).subscribe({
          next: (response) => {
            console.log('Allergy created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating allergy:', error);
          }
        });
        console.log('Allergy Data:', result);
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AllergiesDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: AllergyDTO | undefined) => {
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

          this.allergiesService.updateItem(cleanedData).subscribe({
            next: (response) => {
              console.log('Allergy updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating allergy:', error);
            }
          });
        });
        console.log('Allergy Data:', result);
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
        (Array.isArray(cleanedData[key]) && cleanedData[key].every(item => item === ""))  // Check if array contains only empty strings

      ) {
        cleanedData[key] = originalData[key];
      }
    });

    return cleanedData;
  }

  // Toggle selection for a single row when clicked
  toggleSelection(row: AllergyDTO) {
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

  /*openSearchDialog(): void {
    const dialogRef = this.dialog.open(AllergiesDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: AllergyDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.allergiesService.searchItems(result).subscribe({
          next: (response) => {
            this.dataSource.data = response;
          },
          error: (error) => {
            console.error('Error filtering allergy data:', error);
          }
        });
        console.log('Allergy Data:', result);
      }
    });
  }*/
}
