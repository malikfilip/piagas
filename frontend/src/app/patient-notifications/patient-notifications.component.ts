import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { Message } from '../models/message';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-notifications',
  templateUrl: './patient-notifications.component.html',
  styleUrls: ['./patient-notifications.component.css']
})
export class PatientNotificationsComponent implements OnInit {

  constructor(private pService:PatientService,private rt:Router) { }
 
  user:User ;

  inbox:Message[];

  inboxShow = true;

  displayMessage : Message = null;

  today : string;

  todayDate:Date;




  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')); 
    this.inbox = this.getInbox(this.user.inbox);
    this.getToday();
    this.getReminder();
    if(this.user.type != 'patient')this.rt.navigate(['']);
    
  }

  getInbox(tmp:Message[]){
    return tmp.sort((mes1,mes2)=>{
      if(mes1.time > mes2.time) return 1
      else if (mes1.time < mes2.time) return -1
      else return 0
    }).reverse() 
  }

  read(message : Message){
    
    this.displayMessage = message;
    this.inboxShow = !this.inboxShow;
    if(!message.read){
      //console.log(message)
      this.pService.read(this.user.username,message).subscribe((result:User)=>{
        sessionStorage.setItem('user',JSON.stringify(result));
        this.inbox= this.getInbox(result.inbox);

      })
    }
   
  }

  delete(){}
  back() { 
    this.inboxShow=!this.inboxShow
   this.displayMessage = null
  }

  getToday(){

    let tmp = new Date()

    let date = tmp.getDate()
    let year = tmp.getFullYear();
    let month = tmp.getMonth()+1

    this.todayDate = tmp;

    this.today = (year + '-' + (month < 10 ? `0${month}` : month.toString()) + '-' + (date < 10 ? `0${date}` : date.toString()) ) 
    
  }

  getReminder(){
   
    this.pService.getAppointments(this.user.username,"0000-00-00|00:00").subscribe((tmp: any[])=>{
      let updated = 0;
      tmp.forEach(app=>{
        if(!app.notification && this.timeDifferenceMinutes(new Date(parseInt(app.start.substring(0,4)),parseInt(app.start.substring(5,7))-1,parseInt(app.start.substring(8,10)),
        parseInt(app.start.substring(11,13)),parseInt(app.start.substring(14,16))))<24){
          updated = 1
          this.pService.addMessage(app._id,this.user.username,"Upcoming appointment",
          "We would like to remind you that you have scheduled appointment with doctor " + app.result[0].lastname+ " in 24 hours, your PLH Team",
          "PLH Team","reminder."+app.doctor+Date.now(),this.modifyDate(app.start)).subscribe((tmpUser:User)=>{
            sessionStorage.setItem('user',JSON.stringify(tmpUser));
            console.log('updated')
          })
        }
      })
      if (updated == 1){
        this.user = JSON.parse(sessionStorage.getItem('user')); 
        this.inbox = this.getInbox(this.user.inbox); 
      }
      
    })
  }

  timeDifferenceMinutes(date:Date):number{

    let difference = -this.todayDate.getTime() + date.getTime()
    console.log(Math.floor(difference / (1000 * 60 * 60)))
    return Math.floor(difference / (1000 * 60 * 60))
  }
  modifyDate(date){
  

    let day = parseInt(date.substring(8,10)) - 1
    let month = parseInt(date.substring(5,7))
    if (day == 0) day = 31,month-=1


   return(date.substring(0,5)+ (month < 10 ? `0${month}` : month.toString()) +'-'+  (day < 10 ? `0${day}` : day.toString())+date.substring(10,16))
  }

}
