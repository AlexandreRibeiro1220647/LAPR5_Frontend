import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  imports: [
    MatButton,
    RouterOutlet
  ],
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router) {}

  toOperationType() {
    this.router.navigate(['admin/operation-type']);
  }

  toStaff() {
    this.router.navigate(['admin/staff']); // alterem para o vosso (nome do metodo tbm)
  }

  toPatient() {
    this.router.navigate(['admin/patient']);
  }

  toOperationRoomSchedule() {
    this.router.navigate(['admin/operationRoomSchedule']);
  }

  toAllergies() {
    this.router.navigate(['admin/allergies']);
  }

  toMedicalConditions() {
    this.router.navigate(['admin/medicalConditions']);
  }

  toRoomType(){
    this.router.navigate(['admin/room-type'])
  }

}
