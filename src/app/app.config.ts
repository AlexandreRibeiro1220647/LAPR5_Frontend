import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import {provideHttpClient, withFetch} from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {LoginService} from './services/login/login.service';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {provideAnimations} from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(),
    provideHttpClient(withFetch()), { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'PLANNING_URL', useValue: environment.planningUrl },
    provideAnimationsAsync(), // Providing the API URL
    provideAnimations(),
    importProvidersFrom(MatTableModule, MatButtonModule),
    importProvidersFrom(LoginService),
    { provide: JWT_OPTIONS, useValue: {} }, // Provide JWT_OPTIONS with an empty config
    { provide: JwtHelperService, useClass: JwtHelperService }, provideAnimationsAsync(), // Provide JwtHelperService as a class
  ]
};
