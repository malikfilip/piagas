import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { DoctorService } from '../services/doctor.service';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-appointment',
  templateUrl: './doctor-appointment.component.html',
  styleUrls: ['./doctor-appointment.component.css']
})
export class DoctorAppointmentComponent implements OnInit {

  constructor(private dService:DoctorService,private pService:PatientService, private rt:Router) { }

  loaded 
  cancelText;
  cancelApp = null;
  cancelation 


 user:User = JSON.parse(sessionStorage.getItem('user'))
 appointments:any[]
 ngOnInit(): void {
  sessionStorage.removeItem('patient');
  this.loaded = false;
  this.cancelation = false;  
  this.getAppointments();
  if(this.user.type != 'doctor')this.rt.navigate(['']);
  }
  getAppointments(){
    this.dService.getAppointments(this.user.username,this.getTime()).subscribe((res:any[])=>{
      this.appointments = res.sort((a1: any, a2: any) => {
        if (a1.start < a2.start) return -1
        else if (a1.start > a2.start) return 1
        else return 0
      }).slice(0,3)
      this.loaded = true
    })
  }

  cancelMenu(app){
    this.cancelText="";
    this.cancelApp = app;
    this.cancelation=true;
    sessionStorage.setItem('patient',JSON.stringify(this.cancelApp.patient))
}
cancelSend(){
  console.log(this.cancelApp)
  if(this.cancelText){
  this.dService.getDoc(this.cancelApp.doctor).subscribe((x:User)=>{
    this.pService.addMessage(null,this.cancelApp.patient,"Appointment canceled",
  "Unfortunatelly i have to cancel our upcoming appointment, "+this.cancelText,
  x.name +" "+ x.lastname,"cancel."+this.cancelApp.doctor+Date.now(),this.getTime()
).subscribe(()=>{
  this.dService.cancel(this.cancelApp.patient,this.cancelApp.doctor).subscribe(()=>{this.ngOnInit()})
})
  })
}
else alert('You need to give reason why you are canceling an appointment !')
  

}
cancelDrop(){
  this.cancelApp=null;
  this.cancelation = false;
  
}

reports(user:string){
  sessionStorage.setItem('patient',user)
  this.rt.navigate(['reports'])
}

getTime(){
  let tmp = new Date();
  let day = tmp.getDate()
  let month = tmp.getMonth()+1
  let year = tmp.getFullYear()
  let mins = tmp.getMinutes()
  let hours = tmp.getHours();

  return (year + '-' + (month < 10 ? `0${month}` : month.toString()) + '-' + (day < 10 ? `0${day}` : day.toString())+"|"
  +  ((hours < 10 ? `0${hours}` : hours.toString()) + ':' + (mins < 10 ? `0${mins}` : mins.toString())))
}

}
