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
import { ThreeSceneComponent } from './components/three-scene/three-scene.component';
import {
  AllergiesComponent
} from './components/admin/allergies/allergies.component';
import { AppointmentSurgeryComponent } from './components/staff/appointment-surgery/appointment-surgery.component';
import { RoomTypeComponent } from './components/admin/room-type/room-type.component';
import { StaffComponentOperations } from './components/staff/operation-requests/staff.component-operations';
import {MedicalConditionsComponent} from './components/admin/medical-conditions/medical-conditions.component';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
  {path : 'under-dev', component: UnderDevelopmentComponent},
  {path : 'privacy-policy', component: PrivacyPolicyComponent},
  {
    path: 'staff',
    component: StaffComponent,
    children: [
      { path: 'operation-request', component: StaffComponentOperations },
      { path: 'appointment-surgery', component: AppointmentSurgeryComponent},
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
    ],
  },
  { path: 'patient', component: PatientComponent },
  { path: 'three-scene', component: ThreeSceneComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'operation-type', component: OperationTypeComponent },
      { path: 'staff', component: StaffComponente},
      { path: 'patient', component: AdminPatientComponent },
      { path: 'operationRoomSchedule', component: OperationRoomSchedulesComponent },
      { path: 'room-type', component: RoomTypeComponent},
      { path: 'allergies', component: AllergiesComponent },
      { path: 'medicalConditions', component: MedicalConditionsComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }, // Default child route
    ],
  },
  { path: '', component: HomeComponent },
];
