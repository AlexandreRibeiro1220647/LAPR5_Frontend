import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateSpecializationDto,
  SearchSpecializationDto, Specialization,
  SpecializationDto
} from '../../models/staff/staff';
import {SearchPatientDTO} from '../../models/patient/searchPatientDTO';
import {Patient} from '../../models/patient/patient';

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<Specialization[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<Specialization[]>(`${this.apiUrl}/specializations`, { headers });
  }

  // Get a specialization by ID
  getById(id: string): Observable<SpecializationDto> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<SpecializationDto>(`${this.apiUrl}/specializations/${id}`, { headers });
  }

  // Search specializations
  search(filter: SearchSpecializationDto): Observable<Specialization[]> {
    const headers = this.getAuthHeaders(this.getToken());
    // Construct query parameters from the filter object
    let params = new HttpParams();

    if (filter.specializationCode) {
      params = params.set('code', filter.specializationCode);
    }

    if (filter.specializationDesignation) {
      params = params.set('designation', filter.specializationDesignation);
    }

    if (filter.specializationDescription) {
      params = params.set('description', filter.specializationDescription);
    }

    return this.http.get<Specialization[]>(
      `${this.apiUrl}/specializations/search`, { headers, params }
    );
  }

  // Create a new specialization
  create(createDto: CreateSpecializationDto): Observable<SpecializationDto> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<SpecializationDto>(`${this.apiUrl}/specializations`, createDto, { headers });
  }

  // Update an existing specialization
  update(id: string, updateDto: CreateSpecializationDto): Observable<SpecializationDto> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.put<SpecializationDto>(`${this.apiUrl}/specializations/${id}`, updateDto, { headers });
  }

  // Delete a specialization
  delete(id: string): Observable<void> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.delete<void>(`${this.apiUrl}/specializations/${id}`, { headers });
  }
  getToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("access_token");
    }
  }

  }
