import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { Serv } from '../models/service';
import { PatientService } from '../services/patient.service';
import { Appointment } from '../models/appointment';
import { min } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private pService: PatientService,private rt:Router) { }
  user: User = JSON.parse(sessionStorage.getItem('user'))
  doctor: User = JSON.parse(sessionStorage.getItem('doctor'))
  services: Serv[] = JSON.parse(sessionStorage.getItem('services'))

  date: string
  time: string = "00:00"
  error = ""

  type: string;
  duration:number=-1;


  ngOnInit(): void {
    if(this.user.type != 'patient')this.rt.navigate(['']);
  }
  submit() {
    if (this.date && this.type) {
      let tmpDate = this.date + '|' + this.time 
      console.log(tmpDate)
      this.check(this.doctor.username, tmpDate);
      this.error = ""
    }
    else this.error = "Please fill in the form."
  }

  check(doc, date) {
    this.pService.checkDate(doc).subscribe((tmp: Appointment[]) => {
      let flag = 0
      if (tmp.length > 0) {
        tmp.forEach(app => {
          let start = app.start
          let end = app.end
          if (start <= date && date <= end) {this.error = "That time is already reserved, try again.";flag=1}
          //console.log(tmpStart <= date && date<=tmpEnd )
        })
        if(!flag){
          this.getDuration(this.type);
          this.pService.schedule(this.doctor.username,this.user.username,this.type,date,this.getEnd(date,this.duration),this.doctor.room).subscribe(()=>{
            this.getEnd(date,3)
            this.error="Appointment has been scheduled."
          })
        }

      }
      else {
        this.getDuration(this.type);
          this.pService.schedule(this.doctor.username,this.user.username,this.type,date,this.getEnd(date,this.duration),this.doctor.room).subscribe(()=>{
            this.getEnd(date,3)
            this.error="Appointment has been scheduled."
          })
      }

    })
  }
  getEnd(date:string,duration):string{
    let hours = parseInt(date.substring(date.length-5,date.length-3), 10);
    let day = parseInt(date.substring(date.length-8,date.length-6),10)
    hours += duration
    if (hours >= 24){day++;hours=hours % 24}
    const dayString = day < 10 ? `0${day}` : day.toString();
    const hoursString = hours < 10 ? `0${hours}` : hours.toString();
    return (date.substring(0,date.length-8)+dayString+'|'+hoursString+':'+date.substring(date.length-2))
  }
  getDuration(type){
    this.services.forEach(x=>{
      if(x.type==type)this.duration=x.duration;
    })
  }

  back(){
    this.rt.navigate(['pDoctors'])
  }

}
