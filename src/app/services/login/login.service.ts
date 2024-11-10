// login.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  authenticate(): Observable<any>  {
    console.log("Authenticate");
    return this.http.post(`${this.apiUrl}/User/authenticate`, {});
  }


  // Assuming you are storing the JWT token in localStorage or sessionStorage
  public getDecodedAccessToken(token: string): any {
    if (token) {
      return this.jwtHelper.decodeToken(token);
    } else {
      throw new Error("Error getting token from session.");
    }
  }

  // Get user roles
  public getUserRoles(token: string): string[] {
    const decodedToken = this.getDecodedAccessToken(token);
    return decodedToken ? decodedToken['https://hellth.com/claims/roles'] || [] : [];
  }
}
