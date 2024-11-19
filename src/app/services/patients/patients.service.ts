import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CreatePatientDTO} from '../../models/patients/createPatientDTO';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  createItem(patient: CreatePatientDTO): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/Patients/register/patient`, patient, { headers, responseType: 'text' as 'json' });
  }
}
