import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MedicalConditionDTO} from '../../models/medical-condition/medicalConditionDTO';
import { SearchMedicalConditionDTO } from '../../models/medical-condition/searchMedicalConditionDTO';

@Injectable({
  providedIn: 'root'
})
export class MedicalConditionsService {

  constructor(private http: HttpClient, @Inject('BACKENDMRAM_URL') private mram_api_url: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<MedicalConditionDTO[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<MedicalConditionDTO[]>(`${this.mram_api_url}/medicalConditions`,{ headers });
  }

  createItem(medicalCondition: MedicalConditionDTO): Observable<MedicalConditionDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<MedicalConditionDTO>(`${this.mram_api_url}/medicalConditions`, medicalCondition, { headers });
  }

  updateItem(medicalCondition: any): Observable<MedicalConditionDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.put<any>(`${this.mram_api_url}/medicalConditions`, medicalCondition, { headers });
  }

    searchItems(allergy: SearchMedicalConditionDTO): Observable<MedicalConditionDTO[]> {
        const headers = this.getAuthHeaders(this.getToken());
        let params = new HttpParams();
    
        if (allergy.code) {
          params = params.set('code', allergy.code);
        }
    
        if (allergy.designation) {
          params = params.set('designation', allergy.designation);
        }
    
   
        return this.http.get<MedicalConditionDTO[]>(
          `${this.mram_api_url}/medicalConditions/search`, { params , headers }
        );  }
    

  getToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("access_token");
    }
  }
}
