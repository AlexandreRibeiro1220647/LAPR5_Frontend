import {Component} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-staff',
  standalone: true,
  templateUrl: './staff.component.html',
  imports: [
    MatButton,
    RouterOutlet
  ],
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {

  constructor(private router: Router) {}

  toOperationRequest() {
    this.router.navigate(['staff/operation-request']);
  }

}
