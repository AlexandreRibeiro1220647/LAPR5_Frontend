import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CreateOperationRequestDTO} from '../../models/operation-requests/createOperationRequestDTO';
import {OperationRequest} from '../../models/operation-requests/operationRequest';
import {UpdateOperationRequestDTO} from '../../models/operation-requests/updateOperationRequestDTO';

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
}
