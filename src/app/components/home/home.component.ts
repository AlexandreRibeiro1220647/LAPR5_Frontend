import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LoginService} from '../../services/login/login.service';
import {JWT_OPTIONS} from '@auth0/angular-jwt';

interface Token {
  accessToken: string;
}
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
      console.log(response);

      const sessionId = response.sessionId;
      this.loginService.pollAuthStatus(sessionId).subscribe({
        next: () => {
          this.loginService.getToken(sessionId).subscribe({
            next: (token: Token) => {
              // Now you can use the token, e.g., store it, or send it in headers for authenticated requests
              if (token) {
                // Check the role from the token (or API call to fetch the role)
                const role = this.loginService.getRolesFromToken(token.accessToken); // Extract the role from decoded token
                if (role) {
                  if (role[0] === 'Admin') {
                    this.router.navigate(['admin']);
                  } else if (role[0] === 'Patient') {
                    this.router.navigate(['patient']);
                  } else {
                    this.router.navigate(['ll']);
                  }
                }
              }

            },
            error: (err) => console.error("Polling or token retrieval error:", err),
          });
        },
        error: (err) => console.error("Polling error:", err),
      });
    }, error => {
      console.error('Login failed', error);
    });
  }
}
