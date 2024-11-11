import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PatientComponent} from './components/patient/patient.component';
import {StaffComponent} from './components/staff/staff.component';
import {AdminComponent} from './components/admin/admin.component';
import {UnderDevelopmentComponent} from './components/under-dev/under-development.component';

export const routes: Routes = [
  {path : 'under-dev', component: UnderDevelopmentComponent},
  { path: 'staff', component: StaffComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: HomeComponent },
];
