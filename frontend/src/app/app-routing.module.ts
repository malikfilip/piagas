import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { compileClassMetadata } from '@angular/compiler';
import { PatientDoctorsComponent } from './patient-doctors/patient-doctors.component';
import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
import { PatientNotificationsComponent } from './patient-notifications/patient-notifications.component';
import { PatientProfileComponent } from './patient-profile/patient-profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment.component';
import { DoctorOtherComponent } from './doctor-other/doctor-other.component';
import { RecordComponent } from './record/record.component';
import { ManagerReqComponent } from './manager-req/manager-req.component';
import { ManagerOtherComponent } from './manager-other/manager-other.component';


const routes: Routes = [
  {path:'',pathMatch:'full',component:HomeComponent},
  {path:'pHome',component:PatientProfileComponent},
  {path:'dHome',component:DoctorComponent},
  {path:'manager',component:ManagerComponent},
  {path:'managerLogin',component:ManagerLoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'change', component:ChangePasswordComponent},
  {path:'login', component:LoginComponent},
  {path: 'pDoctors', component:PatientDoctorsComponent},
  {path: 'pAppointments', component:PatientAppointmentComponent},
  {path: 'pNotifications', component:PatientNotificationsComponent},
  {path: 'schedule',component:ScheduleComponent},
  {path: 'dAppointments',component:DoctorAppointmentComponent},
  {path: 'dOther',component:DoctorOtherComponent},
  {path : 'reports',component:RecordComponent},
  {path:'mReq',component:ManagerReqComponent},
  {path : 'mOther', component:ManagerOtherComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
