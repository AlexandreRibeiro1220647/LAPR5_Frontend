import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreatePatientDTO} from '../../models/patient/createPatientDTO';
import {Patient} from '../../models/patient/patient';
import {UpdatePatientDTO} from '../../models/patient/updatePatientDTO';
import {SearchPatientDTO} from '../../models/patient/searchPatientDTO';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<Patient[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<Patient[]>(`${this.apiUrl}/Patients`,{ headers });
  }

  createItem(patient: CreatePatientDTO): Observable<CreatePatientDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<CreatePatientDTO>(`${this.apiUrl}/Patients`, patient, { headers });
  }

  updateItem(id: string, patient: any): Observable<UpdatePatientDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.put<any>(`${this.apiUrl}/Patients/${id}`, patient, { headers });
  }

  deleteItem(id: string): Observable<Patient> {
    //const headers = this.getAuthHeaders(this.getToken());
    return this.http.delete<Patient>(`${this.apiUrl}/Patients/${id}`);
  }

  searchItems(filter: SearchPatientDTO): Observable<Patient[]> {
    const headers = this.getAuthHeaders(this.getToken());
    // Construct query parameters from the filter object
    let params = new HttpParams();

    if (filter.contactInformation) {
      params = params.set('contactInformation', filter.contactInformation);
    }

    if (filter.dateOfBirth) {
      params = params.set('dateOfBirth', filter.dateOfBirth);
    }

    if (filter.gender) {
      params = params.set('gender', filter.gender);
    }

    return this.http.get<Patient[]>(
      `${this.apiUrl}/Patients/search`, { headers, params }
    );
  }

  getToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("access_token");
    }
  }
}
