import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  getItems(): Observable<OperationType[]> {
    return this.http.get<OperationType[]>(`${this.apiUrl}/OperationType`);
  }

  createItem(operationType: CreateOperationTypeDTO): Observable<CreateOperationTypeDTO> {
    return this.http.post<CreateOperationTypeDTO>(`${this.apiUrl}/OperationType`, operationType);
  }

  updateItem(id: string, operationType: any): Observable<UpdateOperationTypeDTO> {
    return this.http.put<any>(`${this.apiUrl}/OperationType/update/${id}`, operationType);
  }

  deleteItem(id: string): Observable<OperationType> {
    return this.http.put<OperationType>(`${this.apiUrl}/OperationType/delete/${id}`, null);
  }

  searchItems(filter: SearchOperationTypeDTO): Observable<OperationType[]> {
    // Construct query parameters from the filter object
    let params = new HttpParams();

    if (filter.name) {
      params = params.set('name', filter.name);
    }

    if (filter.requiredStaffBySpecialization && filter.requiredStaffBySpecialization.length > 0 && filter.requiredStaffBySpecialization[0] != "") {
      params = params.set('specialization', filter.requiredStaffBySpecialization.toString());
    }

    if (filter.estimatedDuration) {
      params = params.set('estimatedDuration', filter.estimatedDuration);
    }

    if (filter.status) {
      params = params.set('status', filter.status);
    }

    return this.http.get<OperationType[]>(
      `${this.apiUrl}/OperationType/search`, { params }
    );  }
}
