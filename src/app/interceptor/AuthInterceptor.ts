import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Check if the cookie or token exists (if you're using cookies)
    const token = document.cookie.split('; ').find(row => row.startsWith('AuthToken='));

    if (token) {
      // If token exists, append it to the request header
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.split('=')[1]}` // Extract token from cookie
        }
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request); // If no token, proceed without adding it
  }
}
