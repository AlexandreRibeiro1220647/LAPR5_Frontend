import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {LoginService} from '../../services/login/login.service';
import {JWT_OPTIONS} from '@auth0/angular-jwt';
import {PatientsService} from '../../services/patients/patients.service';
import {OperationTypesDialogComponent} from '../dialog/operation-types/create/operation-types-dialog.component';
import {CreateOperationTypeDTO} from '../../models/operation-types/createOperationTypeDTO';
import {response} from 'express';
import {MatDialog} from '@angular/material/dialog';
import {CreatePatientDTO} from '../../models/patients/createPatientDTO';
import {SignUpDialogComponent} from '../dialog/login/sign-up-dialog/sign-up-dialog.component';

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
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  constructor(private router: Router, private loginService: LoginService, private patientsService: PatientsService, public dialog: MatDialog) {
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
                console.log(token);
                // Check the role from the token (or API call to fetch the role)
                const role = this.loginService.getRolesFromToken(token.accessToken); // Extract the role from decoded token
                if (role) {
                  if (role[0] === 'Admin') {
                    this.router.navigate(['admin']);
                  } else if (role[0] === 'Patient') {
                    this.router.navigate(['patient']);
                  } else if (role[0] === 'Doctor') {
                    this.router.navigate(['staff']);
                  } else {
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
                    this.patientsService.createItem(result).subscribe({
                      next: (response) => {
                        console.log('Operation created successfully:', response);

                        console.log(token);
                        // Check the role from the token (or API call to fetch the role)
                        const role = this.loginService.getRolesFromToken(token.accessToken); // Extract the role from decoded token
                        if (role) {
                          if (role[0] === 'Patient') {
                            this.router.navigate(['patient']);
                          } else {
                            this.router.navigate(['']);
                            console.log("Error - Logged user doesnt have patient role")
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

  test() {
    const dialogRef = this.dialog.open(SignUpDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: CreatePatientDTO | undefined) => {
      if (result) {

        this.patientsService.createItem(result).subscribe({
          next: (response) => {
            console.log('Patient created successfully:', response);
          },
          error: (error) => {
            console.error('Error creating patient:', error);
          }
        });
      }
    });

  }
}
