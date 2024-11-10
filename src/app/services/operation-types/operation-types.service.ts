import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CreateOperationTypeDTO} from '../../models/operation-types/createOperationTypeDTO';
import {OperationType} from '../../models/operation-types/operationType';

@Injectable({
  providedIn: 'root'
})
export class OperationTypesService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  getItems(): Observable<OperationType[]> {
    return this.http.get<OperationType[]>(`${this.apiUrl}/OperationType`);
  }

  createItem(operationType: CreateOperationTypeDTO): Observable<CreateOperationTypeDTO> {
    return this.http.post<CreateOperationTypeDTO>(`${this.apiUrl}/OperationType`, operationType);
  }

  updateItem(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/OperationType/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/OperationType/${id}`);
  }
}
