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
import { AppointmentSurgery } from '../../models/appointments-surgery/appointmentSurgery';
import { CreateAppointmentSurgeryDTO } from '../../models/appointments-surgery/createAppointmentSurgeryDTO';
import { UpdateAppointmentSurgeryDTO } from '../../models/appointments-surgery/updateAppointmentSurgeryDTO';
import { RoomType } from '../../models/room-types/roomType';
import { SurgeryRoom } from '../../models/surgery-room/surgeryRoom';

@Injectable({
  providedIn: 'root'
})
export class AppointmentSurgeryService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<AppointmentSurgery[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<AppointmentSurgery[]>(`${this.apiUrl}/surgeries`,{ headers });
  }


  createItem(surgery: CreateAppointmentSurgeryDTO): Observable<CreateAppointmentSurgeryDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<CreateAppointmentSurgeryDTO>(`${this.apiUrl}/surgeries/create`, surgery ,{ headers })
  }


  updateItem(id: string, appointmentSurgery: any): Observable<UpdateAppointmentSurgeryDTO> {
    const headers = this.getAuthHeaders(this.getToken());

    return this.http.put<any>(`${this.apiUrl}/surgeries/update/${id}`, appointmentSurgery,{ headers });
  }

  getSurgeryRooms(): Observable<SurgeryRoom[]> {
      const headers = this.getAuthHeaders(this.getToken());

      return this.http.get<SurgeryRoom[]>(`${this.apiUrl}/surgeryRooms`,{ headers });
    }

  getOperationRequests(): Observable<OperationRequest[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<OperationRequest[]>(`${this.apiUrl}/operations`,{ headers });
  }

    
    getToken(): any {
      if (typeof window !== 'undefined') {
        return sessionStorage.getItem("access_token");
      }
    }
}
