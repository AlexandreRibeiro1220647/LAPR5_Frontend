import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  getData() {
    return this.http.get(`${this.apiUrl}/User`);
  }
}
