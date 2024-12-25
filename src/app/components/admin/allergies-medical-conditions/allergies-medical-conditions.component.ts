import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AllergiesService} from '../../../services/allergies/allergies.service';
import {AllergyDTO} from '../../../models/allergy/allergyDTO';
import {AllergiesDialogComponent} from '../../dialog/allergies/allergies-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './allergies-medical-conditions.component.html',
  imports: [
    MatButton
  ],
  styleUrls: ['./allergies-medical-conditions.component.css']
})
export class AllergiesMedicalConditionsComponent {

  constructor(private allergiesService: AllergiesService, public dialog: MatDialog) {
  }

  openCreateAllergyDialog(): void {
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

}
