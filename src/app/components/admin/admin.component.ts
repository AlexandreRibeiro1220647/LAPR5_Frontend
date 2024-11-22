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

  toBlaBla2() {
    this.router.navigate(['under-dev']); // alterem para o vosso
  }

  toOperationRoomSchedule() {
    this.router.navigate(['admin/operationRoomSchedule']);
  }
}
