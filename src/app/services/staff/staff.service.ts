import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateStaffDTO } from '../../models/staff/createStaffDTO';
import { Staff } from '../../models/staff/staff';
import { UpdateStaffDto } from '../../models/staff/updateStaffDTO';
import {SearchStaffDTO} from '../../models/staff/searchStaffDTO';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  private getAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Obter todos os membros do staff
  getStaff(): Observable<Staff[]> {
    const headers = this.getAuthHeaders(this.getToken()!);
    return this.http.get<Staff[]>(`${this.apiUrl}/staff`, { headers });
  }

  // Criar um novo membro do staff
  createStaff(dto: CreateStaffDTO): Observable<CreateStaffDTO> {
    const headers = this.getAuthHeaders(this.getToken()!);
    return this.http.post<CreateStaffDTO>(`${this.apiUrl}/staff/create`, dto, { headers });
  }

  // Atualizar um membro do staff
  updateStaff(id: string, dto: UpdateStaffDto): Observable<UpdateStaffDto> {
    const headers = this.getAuthHeaders(this.getToken()!);
    return this.http.put<UpdateStaffDto>(`${this.apiUrl}/staff/update/${id}`, dto, { headers });
  }

  // Inativar um membro do staff
  inactivateStaff(id: string, dto: UpdateStaffDto): Observable<Staff> {
    const headers = this.getAuthHeaders(this.getToken()!);
    return this.http.delete<Staff>(`${this.apiUrl}/api/staff/${id}`, {
      headers,
      body: dto,
    });
  }
  // Search staff with filters
  searchItems(filter: SearchStaffDTO): Observable<Staff[]> {
    const headers = this.getAuthHeaders(this.getToken());
    let params = new HttpParams();

    if (filter.fullName) {
      params = params.set('fullName', filter.fullName);
    }

    if (filter.email) {
      params = params.set('email', filter.email);
    }

    if (filter.phone) {
      params = params.set('phone', filter.phone);
    }

    if (filter.specialization) {
      params = params.set('specialization', filter.specialization);
    }

    if (filter.status) {
      params = params.set('status', filter.status);
    }

    return this.http.get<Staff[]>(`${this.apiUrl}/staff/search`, { headers, params });
  }

  // Get the authorization token
  private getToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('access_token');
    }
  }
}
