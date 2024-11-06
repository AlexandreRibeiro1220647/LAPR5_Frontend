import { Component, OnInit } from '@angular/core';
import {Router, Routes} from '@angular/router';  // Import Router
import { ApiService } from './services/api-service.service';
import {LoginComponent} from './components/login/login.component';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterModule
  ],
  styleUrls: ['./app.component.css']  // corrected styleUrl to styleUrls for plural usage
})
export class AppComponent implements OnInit {
  title = 'LAPR5_Frontend';
  data: any;
  // Define routes in a standalone component
  routes: Routes = [
    { path: 'login', component: LoginComponent },
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    //this.getData();
    this.router.config = this.routes;
  }

  getData(): void {
    this.apiService.getData().subscribe(response => {
      this.data = response;
      console.log(response);
    });
  }

  // Navigate to the login component
  navigateToLogin(): void {
    this.router.navigate(['/login']);  // Redirect to '/login' route
  }
}
