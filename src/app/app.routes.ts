import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PatientComponent} from './components/patient/patient.component';
import {StaffComponent} from './components/staff/staff.component';
import {AdminComponent} from './components/admin/admin.component';
import {AdminPatientComponent} from './components/admin/patient/admin-patient.component';
import {UnderDevelopmentComponent} from './components/under-dev/under-development.component';
import {OperationTypeComponent} from './components/admin/operation-type/operation-type.component';
import {StaffComponente} from './components/admin/staff/staff.component';
import {
  OperationRoomSchedulesComponent
} from './components/admin/operation-room-schedules/operation-room-schedules.component';

export const routes: Routes = [
  {path : 'under-dev', component: UnderDevelopmentComponent},
  { path: 'staff', component: StaffComponent },
  { path: 'patient', component: PatientComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'operation-type', component: OperationTypeComponent },
      { path: 'staff', component: StaffComponente}, // alterem para o vosso
      { path: 'patient', component: AdminPatientComponent }, // alterem para o vosso
      { path: 'operationRoomSchedule', component: OperationRoomSchedulesComponent },
        
      { path: 'operation-type', redirectTo: '', pathMatch: 'full' }, // Default child route
    ],
  },
  { path: '', component: HomeComponent },
];
