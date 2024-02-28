import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { PatientService } from '../services/patient.service';
import { DoctorService } from '../services/doctor.service';
import { Appointment } from '../models/appointment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  constructor(private pService:PatientService,private dService:DoctorService,private rt:Router) { }

  ngOnInit(): void {
    this.init()
    this.getFinished();
    if(this.doctor.type != 'doctor')this.rt.navigate(['']);
  }

  doctor:User = JSON.parse(sessionStorage.getItem('user'));
  patient = sessionStorage.getItem('patient')
  reports = []
  myReports  = []
  selectedApp = null
  reportText : string;

  diagnosis:string;
  therapy:string;
  dateControl : string;
  timeControl : string;

  error:string


  init(){
    this.pService.join(this.patient).subscribe((x:any[])=>{
      this.reports = x
    })
  }

  getFinished(){
    this.dService.getFinished(this.patient,this.doctor.username,this.getTime()).subscribe((tmp:Appointment[])=>{
      this.myReports = tmp;
 
    })
  }

  addReport(){
   let control = this.dateControl+'|'+this.timeControl
    console.log(this.selectedApp)
    if(this.diagnosis && this.therapy && this.dateControl  && this.timeControl && control > this.selectedApp.end ){
      this.error= ''
      this.dService.addReport(this.patient,this.doctor.username,this.selectedApp.start,this.doctor.spec,this.selectedApp.type,
        this.diagnosis,this.therapy,control,this.selectedApp._id).subscribe(()=>{this.selectedApp=null,this.ngOnInit()})
    }
    else this.error = 'Please fill in all the fields and make sure that date of control is after the appointment.'
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
