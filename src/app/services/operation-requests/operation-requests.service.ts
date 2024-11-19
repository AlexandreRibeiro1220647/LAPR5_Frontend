import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CreateOperationRequestDTO} from '../../models/operation-requests/createOperationRequestDTO';
import {OperationRequest} from '../../models/operation-requests/operationRequest';
import {UpdateOperationRequestDTO} from '../../models/operation-requests/updateOperationRequestDTO';
import {SearchOperationRequestDTO} from '../../models/operation-requests/searchOperationRequestsDTO';
import { OperationType } from '../../models/operation-types/operationType';
import { Patient } from '../../models/patients/patient';

@Injectable({
  providedIn: 'root'
})
export class OperationRequestService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  getItems(): Observable<OperationRequest[]> {
    return this.http.get<OperationRequest[]>(`${this.apiUrl}/operations`);
  }

  createItem(operationRequest: CreateOperationRequestDTO): Observable<CreateOperationRequestDTO> {
    return this.http.post<CreateOperationRequestDTO>(`${this.apiUrl}/operations/create`, operationRequest)
  }


  updateItem(id: string, operationRequest: any): Observable<UpdateOperationRequestDTO> {
    return this.http.put<any>(`${this.apiUrl}/operations/update/${id}`, operationRequest);
  }

  deleteItem(id: string): Observable<OperationRequest> {
    return this.http.delete<OperationRequest>(`${this.apiUrl}/operations?operationId=${id}`);
  }

  searchItems(filter: SearchOperationRequestDTO): Observable<OperationRequest[]> {
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
      `${this.apiUrl}/operations/search`, { params }
    );  }

    getOperationTypes(): Observable<OperationType[]> {
      return this.http.get<OperationType[]>(`${this.apiUrl}/OperationType`);
    }

    getPatients(): Observable<Patient[]> {
      return this.http.get<Patient[]>(`${this.apiUrl}/Patients`);
    }
    
}
