import { Component, OnInit } from '@angular/core';
import { User } from '../models/userModer';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: UserService) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.getDoctors();
  }
  doctors : User[] = []
  searchName = "";
  searchLastname = "";
  searchSpec = "";
  sortParam;

  getDoctors(){
    this.service.getDoctors().subscribe((list : User[])=>{
      this.doctors = list;
    })
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
    }
    this.doctors = tmp;
  }
  search(){
    this.service.search(this.searchName,this.searchLastname,this.searchSpec).subscribe((tmp:User[])=>{this.doctors=tmp})
  }

}
