// login.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  authenticate(): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/authenticate`, {});
  }
}
