// login.service.ts
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

interface Token {
  accessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private jwtHelper: JwtHelperService, private http: HttpClient, @Inject('API_URL') private apiUrl: string) {}

  authenticate(): Observable<any> {
    console.log("Authenticate");
    return this.http.post(`${this.apiUrl}/User/authenticate`, {});
  }


  // Manually decode the JWT to extract roles
  decodeToken(token: string): any | null {
    try {
      const parts = token.split('.'); // Split the token into 3 parts
      if (parts.length !== 3) {
        console.error("Invalid token format.");
        return null;
      }

      const payload = parts[1];

      // Fix Base64 URL-safe encoding
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const paddedBase64 = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '='); // Ensure padding

      // Decode Base64 and parse JSON
      const decodedPayload = atob(paddedBase64);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }


  // Extract roles from the decoded token
  getRolesFromToken(token: string): string[] | null {
    const decodedToken = this.decodeToken(token.toString());
    if (decodedToken) {
      // Access the roles in your custom claim
      const roles = decodedToken['https://hellth.com/claims/roles'];
      return roles ? roles : null;
    }
    return null;
  }

  pollAuthStatus(sessionId: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const interval = setInterval(() => {
        this.http.get<boolean>(`http://localhost:5012/api/Callback/isAuth/${sessionId}`)
          .subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
              clearInterval(interval);
              console.log("Login complete!");
              observer.next(true); // Emit true when login is complete
              observer.complete(); // Complete the observable
            }
          });
      }, 2000); // Check every 2 seconds
    });
  }

  getToken(sessionId: string): Observable<Token> {
    return this.http.get<Token>(`http://localhost:5012/api/User/get-token/${sessionId}`);
  }

  signup(): Observable<any> {
    return this.http.post(`${this.apiUrl}/Patients/signup`, {});
  }
}
