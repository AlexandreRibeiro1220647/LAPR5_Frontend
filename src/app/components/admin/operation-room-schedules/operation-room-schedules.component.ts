import {Component, OnInit} from '@angular/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {AlgavService} from '../../../services/algav/algav.service';
import {ReturnToken} from '../../../models/operation-schedules/returnToken';  // Import Timeline from vis-timeline

@Component({
  selector: 'app-operation-room-schedules',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './operation-room-schedules.component.html',
  styleUrl: './operation-room-schedules.component.css'
})
export class OperationRoomSchedulesComponent implements OnInit{
  agOpRoomBetter: string[][] = [];  // Holds the slots
  totalDayMinutes = 1440;  // Total minutes in a day

  constructor(private algavService: AlgavService) {}

  ngOnInit(): void {
    const opId = "or1";
    const date = 20241028;
    this.algavService.getItems(opId, date).subscribe((data: ReturnToken) => {
      // Fetch the ag_op_room_better data from the service response
      this.agOpRoomBetter = data.ag_op_room_better;
      console.log('Fetched operation room schedule:', this.agOpRoomBetter);  // Debugging
    });
    // Hardcoded testing data
    this.agOpRoomBetter = [
      ["520", "579", "so100000"],
      ["580", "639", "so100004"],
      ["640", "714", "so100005"],
      ["715", "804", "so100002"],
      ["805", "879", "so100003"],
      ["880", "939", "so100001"],
      ["1000", "1059", "so099999"]
    ];
  }


  // Calculate the width of a slot based on the difference between start and finish time
  calculateSlotWidth(start: string, finish: string): number {
    const duration = Number(finish) - Number(start);
    const percentageWidth = (duration / this.totalDayMinutes) * 100;
    return percentageWidth;
  }

  // Calculate the left position based on the start time of a slot
  calculateSlotPosition(start: string): number {
    const percentagePosition = (Number(start) / this.totalDayMinutes) * 100;
    return percentagePosition;
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


}
