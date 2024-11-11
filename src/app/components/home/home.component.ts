import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LoginService} from '../../services/login/login.service';
import {JWT_OPTIONS} from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NgOptimizedImage,
    MatButtonModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private router: Router, private loginService: LoginService) {}

  navigateToLogin(): void {
    this.router.navigate(['login']);
  }

  login() {
    this.loginService.authenticate().subscribe(response => {
      // Assuming the role is stored in the token or session
      const token = document.cookie.split('; ').find(row => row.startsWith('AuthToken='));

      if (token) {
        // Check the role from the token (or API call to fetch the role)
        const role = this.loginService.getUserRoles(token.split('=')[1]); // Extract the role from decoded token

        if (role[0] === 'doctor') {
          this.router.navigate(['/doctor-dashboard']);
        } else if (role[0] === 'patient') {
          this.router.navigate(['/patient-dashboard']);
        } else {
          this.router.navigate(['/default-dashboard']);
        }
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
