// login.component.ts
import { Component } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.authenticate().subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Add any post-login logic, like redirecting or saving tokens
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
