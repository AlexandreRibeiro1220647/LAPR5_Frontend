import { Component, OnInit } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthInterceptor} from './interceptor/AuthInterceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LAPR5_Frontend';
  data: any;

  constructor() {}

  ngOnInit(): void {}

}
