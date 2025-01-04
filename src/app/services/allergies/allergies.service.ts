import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AllergyDTO} from '../../models/allergy/allergyDTO';
import { SearchAllergyDTO } from '../../models/allergy/searchAllergyDTO';

@Injectable({
  providedIn: 'root'
})
export class AllergiesService {

  constructor(private http: HttpClient, @Inject('BACKENDMRAM_URL') private mram_api_url: string) { }

  private getAuthHeaders(token: string): HttpHeaders {
    console.log("Header token:", token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getItems(): Observable<AllergyDTO[]> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.get<AllergyDTO[]>(`${this.mram_api_url}/allergies`,{ headers });
  }

  createItem(allergy: AllergyDTO): Observable<AllergyDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.post<AllergyDTO>(`${this.mram_api_url}/allergies`, allergy, { headers });
  }

  updateItem(allergy: any): Observable<AllergyDTO> {
    const headers = this.getAuthHeaders(this.getToken());
    return this.http.put<any>(`${this.mram_api_url}/allergies`, allergy, { headers });
  }

  
  searchItems(allergy: SearchAllergyDTO): Observable<AllergyDTO[]> {
      const headers = this.getAuthHeaders(this.getToken());
      let params = new HttpParams();
  
      if (allergy.code) {
        params = params.set('code', allergy.code);
      }
  
      if (allergy.designation) {
        params = params.set('designation', allergy.designation);
      }
  
 
      return this.http.get<AllergyDTO[]>(
        `${this.mram_api_url}/allergies/search`, { params , headers }
      );  }
  
  getToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("access_token");
    }
  }
}
