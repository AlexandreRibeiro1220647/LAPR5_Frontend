import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {CreateOperationRequestDTO} from '../../models/operation-requests/createOperationRequestDTO';
import {OperationRequest} from '../../models/operation-requests/operationRequest';
import {UpdateOperationRequestDTO} from '../../models/operation-requests/updateOperationRequestDTO';
import {SearchOperationRequestDTO} from '../../models/operation-requests/searchOperationRequestsDTO';
import { OperationType } from '../../models/operation-types/operationType';
import { Patient } from '../../models/patient/patient';
import { Staff } from '../../models/staff/staff';
import { RoomType } from '../../models/room-types/roomType';
import { CreateRoomTypeDTO } from '../../models/room-types/createRoomTypeDTO';

@Injectable({
  providedIn: 'root'
})
export class RoomTypesService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<RoomType[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<RoomType[]>(`${this.apiUrl}/roomTypes`,{ headers });
  }

  createItem(roomType: CreateRoomTypeDTO): Observable<CreateRoomTypeDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<CreateRoomTypeDTO>(`${this.apiUrl}/roomTypes/create`, roomType,{ headers })
  }
    
    getToken(): any {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem("access_token");
      }
    }
}
