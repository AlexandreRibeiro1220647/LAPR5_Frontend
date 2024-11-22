import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CreateOperationRequestDTO} from '../../models/operation-requests/createOperationRequestDTO';
import {OperationRequest} from '../../models/operation-requests/operationRequest';
import {UpdateOperationRequestDTO} from '../../models/operation-requests/updateOperationRequestDTO';
import {SearchOperationRequestDTO} from '../../models/operation-requests/searchOperationRequestsDTO';
import { OperationType } from '../../models/operation-types/operationType';
import { Patient } from '../../models/patients/patient';
import { Staff } from '../../models/staff/staff';

@Injectable({
  providedIn: 'root'
})
export class OperationRequestService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<OperationRequest[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<OperationRequest[]>(`${this.apiUrl}/operations`,{ headers });
  }

  createItem(operationRequest: CreateOperationRequestDTO): Observable<CreateOperationRequestDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<CreateOperationRequestDTO>(`${this.apiUrl}/operations/create`, operationRequest,{ headers })
  }


  updateItem(id: string, operationRequest: any): Observable<UpdateOperationRequestDTO> {
    const headers = this.getAuthHeaders(this.getToken());

    return this.http.put<any>(`${this.apiUrl}/operations/update/${id}`, operationRequest,{ headers });
  }

  deleteItem(id: string): Observable<OperationRequest> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.delete<OperationRequest>(`${this.apiUrl}/operations?operationId=${id}`,{ headers });
  }

  searchItems(filter: SearchOperationRequestDTO): Observable<OperationRequest[]> {
    const headers = this.getAuthHeaders(this.getToken());

    // Construct query parameters from the filter object
    let params = new HttpParams();

    if (filter.patientName) {
      params = params.set('patientName', filter.patientName);
    }

    if (filter.patientId) {
      params = params.set('patientId', filter.patientId);
    }

    if (filter.operationTypeId) {
      params = params.set('operationTypeId', filter.operationTypeId);
    }

    if (filter.priority) {
      params = params.set('priority', filter.priority);
    }

    if (filter.deadline) {
      params = params.set('deadline', filter.deadline)
    }

    return this.http.get<OperationRequest[]>(
      `${this.apiUrl}/operations/search`, { params , headers }
    );  }

    getOperationTypes(): Observable<OperationType[]> {
      const headers = this.getAuthHeaders(this.getToken());

      return this.http.get<OperationType[]>(`${this.apiUrl}/OperationType`,{ headers });
    }

    getPatients(): Observable<Patient[]> {
      const headers = this.getAuthHeaders(this.getToken());

      return this.http.get<Patient[]>(`${this.apiUrl}/Patients`,{ headers });
    }

    getStaff(): Observable<Staff[]> {
      const headers = this.getAuthHeaders(this.getToken());

      return this.http.get<Staff[]>(`${this.apiUrl}/staff`,{ headers });
    }
    
    getToken(): any {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem("access_token");
      }
    }
}
