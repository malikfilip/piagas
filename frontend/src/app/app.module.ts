import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { DoctorComponent } from './doctor/doctor.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerLoginComponent } from './manager-login/manager-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HomeComponent } from './home/home.component';
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







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctorComponent,
    ManagerComponent,
    ManagerLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    HomeComponent,
    PatientDoctorsComponent,
    PatientAppointmentComponent,
    PatientNotificationsComponent,
    PatientProfileComponent,
    ScheduleComponent,
    DoctorAppointmentComponent,
    DoctorOtherComponent,
    RecordComponent,
    ManagerReqComponent,
    ManagerOtherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
