import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NgOptimizedImage,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }
}
