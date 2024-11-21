import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import {Slot} from '../../../models/staff/slot';
import {StaffStatus} from '../../../models/staff/staffstatus';
import { StaffService } from '../../../services/staff/staff.service';
import { Staff } from '../../../models/staff/staff';
import { CreateStaffDTO } from '../../../models/staff/createStaffDTO';
import { UpdateStaffDto } from '../../../models/staff/updateStaffDTO';
import { SearchStaffDTO } from '../../../models/staff/searchStaffDTO';

import { StaffDialogComponent } from '../../dialog/staff/create/staff-dialog.component';
import { StaffDialogEditComponent } from '../../dialog/staff/edit/staff-dialog-edit.component';
import { StaffSearchDialogComponent } from '../../dialog/staff/search/staff-search-dialog.component';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-staff',
  standalone: true,
  templateUrl: './staff.component.html',
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
  styleUrls: ['./staff.component.css']
})
export class StaffComponente implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['fullName', 'email', 'phone', 'specialization', 'status'];
  dataSource: MatTableDataSource<Staff>;
  selection = new SelectionModel<Staff>(false, []); // Single selection

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private staffService: StaffService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Staff>([]);
  }

  ngOnInit(): void {
    this.loadStaff();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadStaff(): void {
    this.staffService.getStaff().subscribe({
      next: (staffList: Staff[]) => {
        this.dataSource.data = staffList;
      },
      error: (error) => {
        console.error('Error loading staff:', error);
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(StaffDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: CreateStaffDTO | undefined) => {
      if (result) {
        this.staffService.createStaff(result).subscribe({
          next: () => {
            console.log('Staff created successfully');
            this.loadStaff();
          },
          error: (error) => {
            console.error('Error creating staff:', error);
          },
        });
      }
    });
  }

  openEditDialog(): void {
    const selectedStaff = this.selection.selected[0];
    if (!selectedStaff) {
      alert('Please select a staff member to edit.');
      return;
    }

    const dialogRef = this.dialog.open(StaffDialogEditComponent, {
      width: '400px',
      data: selectedStaff,
    });

    dialogRef.afterClosed().subscribe((result: UpdateStaffDto | undefined) => {
      if (result) {
        this.staffService.updateStaff(selectedStaff.licenseNumber, result).subscribe({
          next: () => {
            console.log('Staff updated successfully');
            this.loadStaff();
          },
          error: (error) => {
            console.error('Error updating staff:', error);
          },
        });
      }
    });
  }

  openSearchDialog(): void {
    const dialogRef = this.dialog.open(StaffSearchDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: SearchStaffDTO | undefined) => {
      if (result) {
        this.staffService.searchItems(result).subscribe({
          next: (staffList) => {
            this.dataSource.data = staffList;
          },
          error: (error) => {
            console.error('Error searching staff:', error);
          },
        });
      }
    });
  }

  inactivateStaff(): void {
    const selectedStaff = this.selection.selected[0];
    if (!selectedStaff) {
      alert('Please select a staff member to inactivate.');
      return;
    }

    const updateDto: UpdateStaffDto = {
      fullName: selectedStaff.user.name,
      email: selectedStaff.user.email.value,
      phone: selectedStaff.phone,
      specialization: selectedStaff.specialization,
      availabilitySlots: selectedStaff.availabilitySlots,
      status: StaffStatus.INACTIVE,
    };

    this.staffService.inactivateStaff(selectedStaff.licenseNumber, updateDto).subscribe({
      next: () => {
        console.log('Staff inactivated successfully');
        this.loadStaff();
      },
      error: (error) => {
        console.error('Error inactivating staff:', error);
      },
    });
  }


  announceSortChange(event: any): void {
    console.log('Sort change announced:', event);
  }

  toggleSelection(row: any): void {
    console.log('Row selection toggled:', row);
  }


}
