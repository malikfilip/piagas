import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { DoctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-other',
  templateUrl: './doctor-other.component.html',
  styleUrls: ['./doctor-other.component.css']
})
export class DoctorOtherComponent implements OnInit {

  constructor(private dService:DoctorService,private rt:Router) { }
  
  user:User = JSON.parse(sessionStorage.getItem('user'));

  ngOnInit(): void {
    if(this.user.type != 'doctor')this.rt.navigate(['']);
  }
  

  newBranch:string;
  branchPrice:number=0;
  branchDuration:number;
  
  dayFree:string;
  vacationStart:string;
  vacationEnd;

  error:string = ''

  addBranch(){
    this.error= ''
    if(this.newBranch && this.branchPrice && (this.branchPrice > 0 || this.branchPrice==0)){
    this.dService.addBranch(this.user.name+' '+this.user.lastname,this.newBranch,this.user.spec,this.branchDuration ? this.branchDuration : 0.5,this.branchPrice).subscribe(()=>{alert('added')})
  }
else this.error = "Please make sure that have filled desired branch name and its expected price."}

  addBreak(){
    this.error=''
    if(this.vacationStart && this.vacationEnd && (this.vacationEnd > this.vacationStart)){
    this.dService.addFreeDay(this.user.username,
      this.vacationStart + '|00:00',this.vacationEnd+'|00:00').subscribe(()=>{alert('Break added.')})}
      else this.error='Please select both the start and the end date.'
  }

  addFreeDay(){
    this.error = ''
    if(this.dayFree){
      this.dService.addFreeDay(this.user.username,
        this.dayFree + '|00:00',this.dayFree+'|23:59').subscribe(()=>{alert('Day free added.')})}
        else this.error='Please select desired day that you want to take free.'
      }
  }


