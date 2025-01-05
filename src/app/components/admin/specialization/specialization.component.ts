import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { SpecializationsService } from '../../../services/specialization/specialization.service';
import { Specialization } from '../../../models/staff/staff';
import { SpecializationDto } from '../../../models/staff/staff';
import { CreateSpecializationDto } from '../../../models/staff/staff';
import { SearchSpecializationDto } from '../../../models/staff/staff';
import { SpecializationDialogComponent } from '../../dialog/specialization/create/specialization-dialog.component';
import { SpecializationDialogEditComponent } from '../../dialog/specialization/edit/specialization-dialog-edit.component';
import { SpecializationSearchDialogComponent } from '../../dialog/specialization/search/specialization-search-dialog.component';

@Component({
  selector: 'app-specialization',
  standalone: true,
  templateUrl: './specialization.component.html',
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
    MatPaginator,
    MatSort,
    MatNoDataRow,
    MatSortHeader
  ],
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['designation', 'code', 'description', 'actions'];
  dataSource: MatTableDataSource<Specialization>;
  selection = new SelectionModel<Specialization>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private specializationService: SpecializationsService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Specialization>([]);
  }

  ngOnInit(): void {
    this.loadSpecializations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadSpecializations(): void {
    this.specializationService.getAll().subscribe({
      next: (specializations: Specialization[]) => {
        this.dataSource.data = specializations;
      },
      error: (error) => {
        console.error('Error loading specializations:', error);
      }
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(SpecializationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: CreateSpecializationDto | undefined) => {
      if (result) {
        this.specializationService.create(result).subscribe({
          next: () => {
            console.log('Specialization created successfully');
            this.loadSpecializations();
          },
          error: (error) => {
            console.error('Error creating specialization:', error);
          }
        });
      }
    });
  }

  openEditDialog(): void {
    const selectedSpecialization = this.selection.selected[0];
    if (!selectedSpecialization) {
      alert('Please select a specialization to edit.');
      return;
    }

    const dialogRef = this.dialog.open(SpecializationDialogEditComponent, {
      width: '400px',
      data: selectedSpecialization,
    });

    dialogRef.afterClosed().subscribe((result: Specialization | undefined) => {
      if (result) {
        this.specializationService.update(result.specializationId, result).subscribe({
          next: () => {
            console.log('Specialization updated successfully');
            this.loadSpecializations();
          },
          error: (error) => {
            console.error('Error updating specialization:', error);
          }
        });
      }
    });
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(SpecializationSearchDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: SearchSpecializationDto | undefined) => {
      if (result) {
        this.specializationService.search(result).subscribe({
          next: (specializations) => {
            this.dataSource.data = specializations;
          },
          error: (error) => {
            console.error('Error searching specializations:', error);
          }
        });
      }
    });
  }

  deleteSpecialization(): void {
    const selectedSpecialization = this.selection.selected[0];
    if (!selectedSpecialization) {
      alert('Please select a specialization to delete.');
      return;
    }

    this.specializationService.delete(selectedSpecialization.specializationId).subscribe({
      next: () => {
        console.log('Specialization deleted successfully');
        this.loadSpecializations();
      },
      error: (error) => {
        console.error('Error deleting specialization:', error);
      }
    });
  }

  toggleSelection(row: Specialization): void {
    this.selection.toggle(row);
  }

  isAllSelected(): boolean {
    return this.selection.selected.length === this.dataSource.data.length;
  }

  announceSortChange(event: any): void {
    console.log('Sort change announced:', event);
  }
}
