import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {PatientComponent} from './components/patient/patient.component';
import {StaffComponent} from './components/staff/staff.component';
import {AdminComponent} from './components/admin/admin.component';

export const routes: Routes = [
  { path: 'staff', component: StaffComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
];
