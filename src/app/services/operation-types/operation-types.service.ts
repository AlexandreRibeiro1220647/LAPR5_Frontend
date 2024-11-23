import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateOperationTypeDTO} from '../../models/operation-types/createOperationTypeDTO';
import {OperationType} from '../../models/operation-types/operationType';
import {UpdateOperationTypeDTO} from '../../models/operation-types/updateOperationTypeDTO';
import {SearchOperationTypeDTO} from '../../models/operation-types/searchOperationTypeDTO';

@Injectable({
  providedIn: 'root'
})
export class OperationTypesService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<OperationType[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<OperationType[]>(`${this.apiUrl}/OperationType`,{ headers });
  }

  createItem(operationType: CreateOperationTypeDTO): Observable<CreateOperationTypeDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<CreateOperationTypeDTO>(`${this.apiUrl}/OperationType`, operationType, { headers });
  }

  updateItem(id: string, operationType: any): Observable<UpdateOperationTypeDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.put<any>(`${this.apiUrl}/OperationType/update/${id}`, operationType, { headers });
  }

  deleteItem(id: string): Observable<OperationType> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.put<OperationType>(`${this.apiUrl}/OperationType/delete/${id}`, null, { headers });
  }

  searchItems(filter: SearchOperationTypeDTO): Observable<OperationType[]> {
    const headers = this.getAuthHeaders(this.getToken());
    // Construct query parameters from the filter object
    let params = new HttpParams();

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    if (filter.requiredStaffBySpecialization && filter.requiredStaffBySpecialization.length > 0 && filter.requiredStaffBySpecialization[0] != "") {
      params = params.set('specialization', filter.requiredStaffBySpecialization.toString());
    }

    if (filter.estimatedDuration && filter.estimatedDuration.length > 0 && filter.estimatedDuration[0] != "") {
      params = params.set('estimatedDuration', filter.estimatedDuration.toString());
    }

    if (filter.status) {
      params = params.set('status', filter.status);
    }

    return this.http.get<OperationType[]>(
      `${this.apiUrl}/OperationType/search`, { headers, params }
    );
  }

  getToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("access_token");
    }
  }
}
