import {Component, OnInit} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {AlgavService} from '../../../services/algav/algav.service';
import {MatDialog} from '@angular/material/dialog';
import {OpScheduleParametersDTO} from '../../../models/operation-schedules/OpScheduleParametersDTO';
import {
  OperationRoomSchedulesDialogComponent
} from '../../dialog/operation-room-schedules/operation-room-schedules-dialog.component';
import {MatButton} from '@angular/material/button';  // Import Timeline from vis-timeline

@Component({
  selector: 'app-operation-room-schedules',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    JsonPipe,
    MatButton
  ],
  templateUrl: './operation-room-schedules.component.html',
  styleUrl: './operation-room-schedules.component.css'
})
export class OperationRoomSchedulesComponent implements OnInit{
  agOpRoomBetter: string[][] = [];  // Holds the slots
  totalDayMinutes = 1440;  // Total minutes in a day

  constructor(private algavService: AlgavService, public dialog: MatDialog) {}

  ngOnInit(): void {

  }


  // Calculate the width of a slot based on the difference between start and finish time
  calculateSlotWidth(start: string, finish: string): number {
    const duration = Number(finish) - Number(start);
    return (duration / this.totalDayMinutes) * 100;
  }

  // Calculate the left position based on the start time of a slot
  calculateSlotPosition(start: string): number {
    return (Number(start) / this.totalDayMinutes) * 100;
  }

  // Format time from 'HHmm' to 'HH:mm' without using slice
  formatTime(minutes: string): string {
    const hours = Math.floor(Number(minutes) / 60);  // Get the hours
    const mins = Number(minutes) % 60;  // Get the remaining minutes

    // Format hours and minutes with leading zero if necessary
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = mins.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(OperationRoomSchedulesDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: OpScheduleParametersDTO | undefined) => {
      if (result) {
        // Handle the result data here, e.g., add it to your data array
        this.algavService.getItems(result.opRoomId, result.date).subscribe({
          next: (data) => {
            // Fetch the ag_op_room_better data from the service response
            this.agOpRoomBetter = data.ag_op_room_better;
            console.log('Fetched operation room schedule:', this.agOpRoomBetter);  // Debugging
          },
          error: (error) => {
            console.error('Error fetching operation room schedule:', error);
          }
        });
        console.log('Room and Date:', result);
      }
    });
  }
}
