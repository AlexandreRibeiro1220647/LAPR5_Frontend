import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {CommonModule, NgIf, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LoginService} from '../../services/login/login.service';
import {JWT_OPTIONS} from '@auth0/angular-jwt';
import {PatientService} from '../../services/patient/patient.service';
import {MatDialog} from '@angular/material/dialog';
import {CreatePatientDTO} from '../../models/patient/createPatientDTO';
import {SignUpDialogComponent} from '../dialog/login/sign-up-dialog/sign-up-dialog.component';

interface Token {
  accessToken: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    MatButtonModule,
    NgIf
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  isLoggedIn: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private patientService: PatientService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.isLoggedIn = this.loginService.isLoggedIn();
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
                sessionStorage.setItem("access_token", token.accessToken);
                sessionStorage.setItem("session_id", sessionId);
                console.log(token);
                // Check the role from the token (or API call to fetch the role)
                const role = this.loginService.getRolesFromToken(token.accessToken); // Extract the role from decoded token
                if (role) {
                  if (role[0] === 'Admin') {
                    this.loginService.login();
                    this.router.navigate(['admin']);
                  } else if (role[0] === 'Patient') {
                    this.loginService.login();
                    this.router.navigate(['patient']);
                  } else if (role[0] === 'Doctor') {
                    this.loginService.login();
                    this.router.navigate(['staff']);
                  } else {
                    this.loginService.logout();
                    this.router.navigate(['']);
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

  signup() {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: CreatePatientDTO | undefined) => {
      if (result) {

        this.loginService.signup().subscribe(response1 => {

          console.log(response1);

          const sessionId = response1.sessionId;
          this.loginService.pollAuthStatus(sessionId).subscribe({
            next: () => {

              this.loginService.getToken(sessionId).subscribe({
                next: (token: Token) => {

                  // Now you can use the token, e.g., store it, or send it in headers for authenticated requests
                  if (token) {
                    this.patientService.createItem(result).subscribe({
                      next: (response) => {
                        console.log('Patient created successfully:', response);

                        sessionStorage.setItem("access_token", token.accessToken);
                        sessionStorage.setItem("session_id", sessionId);

                        console.log(token);
                        // Check the role from the token (or API call to fetch the role)
                        const role = this.loginService.getRolesFromToken(token.accessToken); // Extract the role from decoded token
                        console.log("role", role);
                        if (role) {
                          if (role[0] === 'Patient') {
                            this.loginService.login();
                            this.router.navigate(['patient']);
                          } else {
                            this.loginService.logout();
                            this.router.navigate(['']);
                            console.error("Logged user doesnt have patient role")
                          }
                        }

                      },
                      error: (error) => {
                        console.error('Error creating operation:', error);
                      }
                    });
                  }
                },
                error: (err) => console.error("Polling or token retrieval error:", err),
              });
            },
            error: (err) => console.error("Polling error:", err),
          });
        }, error => {
          console.error('Sign Up failed', error);
        });
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
