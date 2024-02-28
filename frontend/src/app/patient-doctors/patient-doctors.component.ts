import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { UserService } from '../services/user.service';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { Serv } from '../models/service';

@Component({
  selector: 'app-patient-doctors',
  templateUrl: './patient-doctors.component.html',
  styleUrls: ['./patient-doctors.component.css']
})
export class PatientDoctorsComponent implements OnInit {

  constructor(private service:UserService,private servicePatient:PatientService,private rt:Router) { }
  user:User = JSON.parse(sessionStorage.getItem('user'))
  ngOnInit(): void {
    this.getDoctors();
    if(this.user.type != 'patient')this.rt.navigate(['']);
  } 

  doctors : User[];
  searchName:string="";
  searchSpec:string="";
  searchLastname:string="";
  searchRoom:string="";
  doctorInfo:User;
  showDoc=false;
  sortParam;

  docServices = []

  getDoctors(){
    this.service.getDoctors().subscribe((tmp:User[])=>this.doctors=tmp)
  }
  sortDown(){
    let tmp = this.doctors;
    switch(this.sortParam){
      case 'name':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.name > doc2.name) return -1
          else if (doc1.name < doc2.name) return 1
          else return 0
        }) 
        break;}
      case 'lastname':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.lastname > doc2.lastname) return -1
          else if (doc1.lastname < doc2.lastname) return 1
          else return 0
        })  
        break;}
      case 'spec':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.spec > doc2.spec) return -1
          else if (doc1.spec < doc2.spec) return 1
          else return 0
        }) 
        break;}
      case 'room':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.room > doc2.room) return -1
          else if (doc1.room < doc2.room) return 1
          else return 0
        }) 
        break;}
    }
    this.doctors = tmp;

  }
  sortUp(){
    let tmp = this.doctors;
    switch(this.sortParam){
      case 'name':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.name > doc2.name) return 1
          else if (doc1.name < doc2.name) return -1
          else return 0
        }) 
        break;}
      case 'lastname':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.lastname > doc2.lastname) return 1
          else if (doc1.lastname < doc2.lastname) return -1
          else return 0
        })  
        break;}
      case 'spec':{
        tmp.sort((doc1,doc2)=>{
          if(doc1.spec > doc2.spec) return 1
          else if (doc1.spec < doc2.spec) return -1
          else return 0
        }) 
        break;}
        case 'room':{
          tmp.sort((doc1,doc2)=>{
            if(doc1.room > doc2.room) return 1
            else if (doc1.room < doc2.room) return -1
            else return 0
          }) 
          break;}
    }
    this.doctors = tmp;
  }
  search(){
    this.servicePatient.search(this.searchName,this.searchLastname,this.searchSpec,this.searchRoom).subscribe((tmp:User[])=>{this.doctors=tmp})
  }
  info(doc){
    this.showDoc=true;
    this.servicePatient.getDoctor(doc).subscribe((x:User)=>(this.doctorInfo=x))
    this.getServices(doc);
    

  }
  schedule(){
    sessionStorage.setItem('doctor',JSON.stringify(this.doctorInfo))
    sessionStorage.setItem('services',JSON.stringify(this.docServices))
    this.rt.navigate(['schedule'])
  }
  
  getServices(doctor){
    this.servicePatient.getServices(doctor).subscribe((x:Serv[])=>{
      this.docServices=x;
    })
  }

}
